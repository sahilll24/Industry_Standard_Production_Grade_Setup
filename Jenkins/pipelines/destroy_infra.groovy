

stage("Terraform Destroy") {
    dir("terraform/envs/dev") {
        sh "
       terraform destroy -auto-approve
        "
    }
}