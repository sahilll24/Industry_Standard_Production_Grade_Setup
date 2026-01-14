stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }
    sleep(300)
    dir("ansible") {
        sh """
         export NEW_COLOR=${env.NEW_COLOR}
        ansible-playbook -i inventory/aws_ec2.yml playbooks/deploy.yml
        """
    }
}
