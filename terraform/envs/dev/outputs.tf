

output "alb_dns_name" {
  value = module.alb.alb_dns_name
}

output "blue_tg_arn" {
  value = module.alb.blue_tg
}

output "green_tg_arn" {
  value = module.alb.green_tg
}
output "active_asg_name" {
  value = module.asg.asg_name
}

output "active_deploy_color" {
  value = module.asg.deploy_color
}

output "launch_template_id" {
  value = module.asg.launch_template_id
}

output "launch_template_version" {
  value = module.asg.launch_template_version
}
output "listener_arn" {
  value = module.alb.listener_arn
}
