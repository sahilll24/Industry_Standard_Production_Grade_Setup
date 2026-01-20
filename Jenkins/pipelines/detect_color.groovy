stage("Detect Active Color") {
    script {

       
        def listenerArn = sh(
            script: "terraform -chdir=terraform/envs/dev output -raw listener_arn",
            returnStdout: true
        ).trim()

     
        def activeTG = sh(
            script: """
            aws elbv2 describe-listeners \
              --listener-arn ${listenerArn} \
              --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
              --output text \
              --region ${AWS_REGION}
            """,
            returnStdout: true
        ).trim()

       
        if (activeTG.contains("blue")) {
            env.ACTIVE_COLOR = "blue"
            env.NEW_COLOR = "green"
        } else {
            env.ACTIVE_COLOR = "green"
            env.NEW_COLOR = "blue"
        }

        echo "🟦 Active: ${env.ACTIVE_COLOR}"
        echo "🟩 New: ${env.NEW_COLOR}"
    }
}
