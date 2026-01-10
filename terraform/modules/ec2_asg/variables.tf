variable "project_name" {
  type = string
}

variable "env" {
  type = string
}

variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "subnets" {
  type = list(string)
}

variable "app_sg" {
  type = string
}

variable "target_group" {
  type = string
}
variable "instance_profile_name" {
  type = string
}
variable "deploy_color" {
  type = string
}
