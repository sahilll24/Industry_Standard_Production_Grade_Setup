stage("Switch Traffic to ${env.NEW_COLOR}") {
    script {

        def listenerArn = sh(
            script: "terraform -chdir=terraform/envs/dev/base output -raw listener_arn",
            returnStdout: true
        ).trim()

        def newTgArn = sh(
            script: "terraform -chdir=terraform/envs/dev/base output -raw ${env.NEW_COLOR}_tg_arn",
            returnStdout: true
        ).trim()

        echo " Listener ARN: ${listenerArn}"
        echo " Switching traffic to TG: ${newTgArn}"

        //  SAFETY CHECK
        def health = sh(
            script: """
            aws elbv2 describe-target-health \
              --target-group-arn ${newTgArn} \
              --query 'TargetHealthDescriptions[*].TargetHealth.State' \
              --output text \
              --region ${AWS_REGION}
            """,
            returnStdout: true
        ).trim()

        def states = health.split("\\s+")

        if (states.size() == 0 || !states.every { it == "healthy" }) {
            error "❌ Traffic switch aborted — ${env.NEW_COLOR} targets not healthy: ${health}"
        }

        //  SWITCH TRAFFIC
        sh """
        aws elbv2 modify-listener \
          --listener-arn ${listenerArn} \
          --default-actions Type=forward,TargetGroupArn=${newTgArn} \
          --region ${AWS_REGION}
        """

        echo "✅ Traffic successfully switched to ${env.NEW_COLOR.toUpperCase()}"
    }
}
