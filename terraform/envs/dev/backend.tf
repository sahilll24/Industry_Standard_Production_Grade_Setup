terraform {
  backend "s3" {
    bucket         = "doctor-consultation-app-terraform-state"
    key            = "envs/dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
