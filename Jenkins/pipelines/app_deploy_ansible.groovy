stage("Ansible Deploy (${env.NEW_COLOR})") {
    dir("ansible") {
        sh """
              export AWS_REGION=${AWS_REGION}

              ansible-galaxy collection install amazon.aws --force
              ansible-galaxy collection install community.aws --force

              ansible-inventory -i inventory/aws_ec2.yml --graph
              ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
        """
    }
}
