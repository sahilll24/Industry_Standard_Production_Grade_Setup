resource "aws_lb" "this" {
  name               = "${var.project_name}-${var.env}-alb"
  load_balancer_type = "application"
  security_groups    = [var.alb_sg]
  subnets            = var.subnets

  tags = {
    Name = "${var.project_name}-${var.env}-alb"
  }
}


resource "aws_lb_target_group" "blue" {
  name     = "${var.env}-blue"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path                = "/"
    matcher             = "200"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 15
    timeout             = 5
  }
}

resource "aws_lb_target_group" "green" {
  name     = "${var.env}-green"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path                = "/"
    matcher             = "200"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 15
    timeout             = 5
  }
}


resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

 default_action {
  type = "forward"

  forward {
    target_group {
      arn    = aws_lb_target_group.blue.arn
      weight = var.blue_weight
    }

    target_group {
      arn    = aws_lb_target_group.green.arn
      weight = var.green_weight
    }
  }
}

}
