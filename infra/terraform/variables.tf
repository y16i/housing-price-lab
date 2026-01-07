variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "asia-northeast1"
}

variable "service_name" {
  type    = string
  default = "autovalue-insight"
}

variable "image_url" {
  type        = string
  description = "Docker image URL for Cloud Run deployment"
}
