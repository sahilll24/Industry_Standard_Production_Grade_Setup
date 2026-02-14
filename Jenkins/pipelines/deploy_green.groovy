stage("Deploy ${env.NEW_COLOR} Infra") {
    dir("terraform/envs/dev/color") {
        sh """
          terraform init -reconfigure
          terraform validate
          terraform plan
          terraform apply -auto-approve \
            -var="deploy_color=${env.NEW_COLOR}"
        """
    }
}
