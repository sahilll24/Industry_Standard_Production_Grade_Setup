stage("Cleanup ${env.ACTIVE_COLOR}") {
    input message: "Traffic switched. Scale down ${env.ACTIVE_COLOR}?"

    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="cleanup_color=${env.ACTIVE_COLOR}"
        """
    }
}
