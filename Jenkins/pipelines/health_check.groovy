stage("Health Check") {
    script {
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {
                def health = sh(
                    script: """
                    aws elbv2 describe-target-health \
                      --target-group-arn $(terraform -chdir=terraform/envs/dev output -raw ${env.NEW_COLOR}_tg_arn) \
                      --query 'TargetHealthDescriptions[*].TargetHealth.State' \
                      --output text \
                      --region ${AWS_REGION}
                    """,
                    returnStdout: true
                ).trim()

                echo "Health Status: ${health}"
                return health.contains("healthy")
            }
        }
    }
}
