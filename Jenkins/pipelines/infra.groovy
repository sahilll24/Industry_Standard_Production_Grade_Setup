#!/usr/bin/env groovy

echo "🏗 Infrastructure Provisioning Started For Base and Bootstrap..."


stage("Bootstrapping") {
    dir("terraform/bootstrap") {
        sh """
            terraform init
            terraform apply -auto-approve
        """
    }
}

stage("Terraform Init for base infra") {
    dir("terraform/envs/dev/base") {
        sh "terraform init -reconfigure"
    }
}

stage("Terraform Validate for base infra") {
    dir("terraform/envs/dev/base") {
        sh "terraform validate"
    }
}

stage("Terraform Plan for base infra") {
    dir("terraform/envs/dev/base") {
        sh "terraform plan"
    }
}

stage("Terraform Apply for base infra") {
    dir("terraform/envs/dev/base") {
        sh "terraform apply -auto-approve"
    }
}

echo "✅ Infrastructure Ready for Base And Bootstrap...."
