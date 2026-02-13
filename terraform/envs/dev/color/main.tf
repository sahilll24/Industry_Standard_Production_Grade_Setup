data "terraform_remote_state" "base" {
  backend = "s3"
  config = {
    bucket = "doctor-consultation-app-terraform-state"
    key    = "envs/dev/base/terraform.tfstate"
    region = "ap-south-1"
  }
}

module "asg" {
  source = "../../../modules/ec2_asg"

  project_name          = "doctor-app"
  env                   = "dev"
  ami                   = "ami-0ced6a024bb18ff2e"
  instance_type         = "t3.micro"
  subnets               = data.terraform_remote_state.base.outputs.public_subnets
  app_sg                = data.terraform_remote_state.base.outputs.ec2_sg
  instance_profile_name = data.terraform_remote_state.base.outputs.instance_profile_name

  deploy_color = var.deploy_color
  target_group = (
  var.deploy_color == "blue"
    ? data.terraform_remote_state.base.outputs.blue_tg_arn
    : data.terraform_remote_state.base.outputs.green_tg_arn
)

}
