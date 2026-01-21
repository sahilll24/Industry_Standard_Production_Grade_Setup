
stage("Terraform Destroy") {
    dir("terraform/envs/dev") {
        sh """
            terraform destroy -auto-approve \
            -var="deploy_color=${params.DEPLOY_COLOR}"
        """
    }
}



