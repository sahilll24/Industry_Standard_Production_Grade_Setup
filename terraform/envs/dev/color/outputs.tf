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
