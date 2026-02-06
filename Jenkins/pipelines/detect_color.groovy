stage("Detect Active Color") {
    script {

        def listenerArn = sh(
            script: "terraform -chdir=terraform/envs/dev/base output -raw listener_arn",
            returnStdout: true
        ).trim()

        def activeTG = sh(
            script: """
              aws elbv2 describe-listeners \
                --listener-arn ${listenerArn} \
                --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
                --output text \
                --region ${AWS_REGION} || echo NONE
            """,
            returnStdout: true
        ).trim()

        if (activeTG == "NONE" || activeTG == "") {
            env.ACTIVE_COLOR = "none"
            env.NEW_COLOR = "blue"
        } else if (activeTG.contains("blue")) {
            env.ACTIVE_COLOR = "blue"
            env.NEW_COLOR = "green"
        } else {
            env.ACTIVE_COLOR = "green"
            env.NEW_COLOR = "blue"
        }

        echo "🟦 Active Color: ${env.ACTIVE_COLOR}"
        echo "🟩 New Color: ${env.NEW_COLOR}"
    }
}
