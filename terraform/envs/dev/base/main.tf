module "vpc" {
  source = "../../../modules/vpc"

  env  = "dev"
  cidr = "10.0.0.0/16"
  azs  = ["ap-south-1a", "ap-south-1b"]
}

module "sg" {
  source = "../../../modules/security_group"

  project_name = "doctor-app"
  env          = "dev"
  vpc_id       = module.vpc.vpc_id
}


module "alb" {
  source = "../../../modules/alb"

  project_name = "doctor-app"
  env          = "dev"
  vpc_id       = module.vpc.vpc_id
  subnets      = module.vpc.public_subnets
  alb_sg       = module.sg.alb_sg
}
module "iam" {
  source = "../../../modules/iam"

  project_name = "doctor-app"
  env          = "dev"
}
