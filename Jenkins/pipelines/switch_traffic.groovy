stage("Switch Traffic to ${env.NEW_COLOR}") {
    script {

        def listenerArn = sh(
            script: "terraform -chdir=terraform/envs/dev output -raw -no-color listener_arn",
            returnStdout: true
        ).trim()

        def newTgArn = sh(
            script: "terraform -chdir=terraform/envs/dev output -raw -no-color ${env.NEW_COLOR}_tg_arn",
            returnStdout: true
        ).trim()

        echo "Listener ARN: ${listenerArn}"
        echo "Switching to TG: ${newTgArn}"

        sh """
        aws elbv2 modify-listener \
          --listener-arn ${listenerArn} \
          --default-actions Type=forward,TargetGroupArn=${newTgArn} \
          --region ${AWS_REGION}
        """

        echo "🚦 Traffic successfully switched to ${env.NEW_COLOR.toUpperCase()}"
    }
}
