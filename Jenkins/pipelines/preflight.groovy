stage("Terraform Check") {
    dir("terraform/envs/dev") {
        sh """
        terraform --version
       
       
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
stage("Set Deployment Color") {
    script {
        env.NEW_COLOR = params.DEPLOY_COLOR
        echo "🎨 Deployment Color Set To: ${env.NEW_COLOR}"
    }
}


