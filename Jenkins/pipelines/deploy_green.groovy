stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }
    dir("ansible") {
        sh """
        ansible-playbook playbooks/deploy.yml
        """
    }
}
