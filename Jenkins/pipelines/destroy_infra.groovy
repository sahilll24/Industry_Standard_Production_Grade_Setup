

stage("Terraform Destroy(bootstrap)") {
    dir("terraform/bootstrap") {
        sh "terraform destroy -auto-approve"
    }
}

stage("Terraform Destroy") {
    dir("terraform/envs/dev") {
        sh "terraform destroy -auto-approve"
    }
}