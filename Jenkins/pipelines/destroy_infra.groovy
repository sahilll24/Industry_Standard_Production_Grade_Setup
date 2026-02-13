if (params.DESTROY_ALL) {

    stage("🔥 Destroy All Infra (Demo Cleanup)") {

        input message: "⚠️ Screenshots taken? This will DESTROY ALL infra (color → base → bootstrap)"

        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']
        ]) {

            echo "🟥 Destroying COLOR layer"
            dir("terraform/envs/dev/color") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }

            echo "🟦 Destroying BASE layer"
            dir("terraform/envs/dev/base") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }

            echo "🟨 Destroying BOOTSTRAP layer"
            dir("terraform/bootstrap") {
                sh """
                  terraform init -reconfigure
                  terraform destroy -auto-approve
                """
            }
        }

        echo "🧹 All demo infrastructure destroyed successfully"
    }

} else {
    echo "DESTROY_ALL not selected — skipping full destroy."
}
