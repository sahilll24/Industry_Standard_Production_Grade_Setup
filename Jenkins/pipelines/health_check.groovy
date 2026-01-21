stage("Health Check") {
    script {
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {

                def tgArn = sh(
                    script: "terraform -chdir=terraform/envs/dev output -raw -no-color ${env.NEW_COLOR}_tg_arn",
                    returnStdout: true
                ).trim()

                echo "Target Group ARN (${env.NEW_COLOR}): ${tgArn}"

                def health = sh(
                    script: """
                    aws elbv2 describe-target-health \
                      --target-group-arn ${tgArn} \
                      --query 'TargetHealthDescriptions[*].TargetHealth.State' \
                      --output text \
                      --region ${AWS_REGION}
                    """,
                    returnStdout: true
                ).trim()

                echo "🩺 ${env.NEW_COLOR.toUpperCase()} Health Status: ${health}"

                return health.contains("healthy")
            }
        }
    }
}
