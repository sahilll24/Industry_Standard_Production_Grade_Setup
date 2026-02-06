stage("🔥 Destroy All Infra (Demo Cleanup)") {
    when {
        expression { params.DESTROY_ALL }
    }
    steps {
        input message: "⚠️ Screenshots taken? This will DESTROY ALL infra (color → base → bootstrap)"

        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']
        ]) {

           
            dir("terraform/envs/dev/color") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }

           
            dir("terraform/envs/dev/base") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }

          
            dir("terraform/bootstrap") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }
        }

        echo "🧹 All demo infrastructure destroyed successfully"
    }
}
