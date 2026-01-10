output "alb_arn" {
  value = aws_lb.this.arn
}

output "alb_dns_name" {
  value = aws_lb.this.dns_name
}

output "blue_tg" {
  value = aws_lb_target_group.blue.arn
}

output "green_tg" {
  value = aws_lb_target_group.green.arn
}
