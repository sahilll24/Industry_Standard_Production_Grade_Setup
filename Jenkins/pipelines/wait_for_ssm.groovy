stage("Wait for SSM (${env.NEW_COLOR})") {
    script {
        timeout(time: 10, unit: 'MINUTES') {
            waitUntil {
                def count = sh(
                    script: """
                      aws ssm describe-instance-information \
                        --region ${AWS_REGION} \
                        --query "InstanceInformationList[?PingStatus=='Online'] | length(@)" \
                        --output text
                    """,
                    returnStdout: true
                ).trim()

                echo "🖥 Online SSM instances: ${count}"
                return count.isInteger() && count.toInteger() > 0
            }
        }
    }
}
