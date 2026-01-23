resource "aws_launch_template" "this" {

  iam_instance_profile {
    name = var.instance_profile_name
  }

  image_id      = var.ami
  instance_type = var.instance_type

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [var.app_sg]
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 2
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name    = "${var.project_name}-${var.env}-${var.deploy_color}"
      Project = var.project_name
      Env     = var.env
      Role    = "app"
      Color   = var.deploy_color
    }
  }
}


resource "aws_autoscaling_group" "this" {
  name                = "${var.project_name}-${var.env}-${var.deploy_color}-asg"
  desired_capacity    = 2
  max_size            = 4
  min_size            = 2
  vpc_zone_identifier = var.subnets
  target_group_arns   = [var.target_group]

  launch_template {
    id      = aws_launch_template.this.id
    version = "$Latest"
  }

  tag {
    key                 = "Role"
    value               = "app"
    propagate_at_launch = true
  }

  tag {
    key                 = "Env"
    value               = var.env
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = var.project_name
    propagate_at_launch = true
  }

  tag {
    key                 = "Color"
    value               = var.deploy_color
    propagate_at_launch = true
  }
}
