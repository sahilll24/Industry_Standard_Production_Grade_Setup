variable "project_name" {
  type = string
}

variable "env" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnets" {
  type = list(string)
}

variable "alb_sg" {
  type = string
}

variable "blue_weight" {
  type    = number
  default = 100
}

variable "green_weight" {
  type    = number
  default = 0
}
