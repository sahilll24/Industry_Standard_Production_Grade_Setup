stage("Ansible Deploy (${env.NEW_COLOR})") {
    dir("ansible") {
        sh """
          ansible-inventory -i inventory/aws_ec2.yml --graph
          ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
        """
    }
}
