#!/usr/bin/env groovy

echo "🏗 Infrastructure Provisioning Started"
echo "🎨 Deploy Color Selected: ${params.DEPLOY_COLOR}"

stage("Bootstrapping") {
    dir("terraform/bootstrap") {
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
        sh """
            terraform plan \
            -var="deploy_color=${params.DEPLOY_COLOR}"
        """
    }
}

stage("Terraform Apply") {
    dir("terraform/envs/dev") {
        sh """
            terraform apply -auto-approve \
            -var="deploy_color=${params.DEPLOY_COLOR}"
        """
    }
}

echo "✅ Infrastructure Ready for ${params.DEPLOY_COLOR}"
