output "alb_dns_name" {
  value = module.alb.alb_dns_name
}
output "ec2_sg" {
  value = module.sg.ec2_sg
}
output "blue_tg_arn" {
  value = module.alb.blue_tg
}

output "green_tg_arn" {
  value = module.alb.green_tg
}

output "listener_arn" {
  value = module.alb.listener_arn
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "instance_profile_name" {
  value = module.iam.instance_profile_name
}
