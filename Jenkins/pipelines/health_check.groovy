stage("Health Check") {
    script {
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {

                def tgArn = sh(
                    script: "terraform -chdir=terraform/envs/dev/base output -raw ${env.NEW_COLOR}_tg_arn",
                    returnStdout: true
                ).trim()

                echo "🎯 Target Group ARN (${env.NEW_COLOR}): ${tgArn}"

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

                echo "🩺 ${env.NEW_COLOR.toUpperCase()} Target States: ${health}"

                def states = health.split("\\s+")

                if (states.size() == 0) {
                    echo "⚠️ No targets registered yet"
                    return false
                }

                return states.every { it == "healthy" }
            }
        }
    }
}
