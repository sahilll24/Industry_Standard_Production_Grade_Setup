stage("Terraform Check") {
    dir("terraform/envs/dev") {
        sh """
        terraform --version
        terraform init -backend=false
        terraform validate
       
        """
    }
}

stage("Ansible Check") {
    sh """
    ansible --version
    ansible-inventory --graph
    ansible role_app -m ping
    """
}

stage("AWS Identity Check") {
    sh """
    aws sts get-caller-identity --region ${AWS_REGION}
    """
}
