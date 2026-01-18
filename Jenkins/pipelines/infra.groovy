#!/usr/bin/env groovy

echo "🏗 Infrastructure Provisioning Started"

stage("Bootstrapping"){
    dir("terraform/bootstrap"){
        sh """
            terraform init
            terraform apply -auto-approve
        """
    }
}

stage("Terraform Init") {
    dir("terraform/envs/dev") {
        sh "terraform init -reconfigure"
    }
}

stage("Terraform Validate") {
    dir("terraform/envs/dev") {
        sh "terraform validate"
    }
}

stage("Terraform Plan") {
    dir("terraform/envs/dev") {
        sh "terraform plan"
    }
}

stage("Terraform Apply") {
    dir("terraform/envs/dev") {
        sh "terraform apply -auto-approve"
        
    }
}

echo "✅ Infrastructure Ready"
