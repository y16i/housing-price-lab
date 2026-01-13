# Terraform backend configuration for GCS state storage
# This ensures state persistence across CI/CD runs and enables team collaboration
#
# Prerequisites:
# 1. Create a GCS bucket for storing Terraform state
# 2. Pass the bucket name via -backend-config flag during terraform init
# 3. Ensure the service account has Storage Object Admin permissions on the bucket
#
# Example initialization:
#   terraform init -backend-config="bucket=your-terraform-state-bucket"

terraform {
  backend "gcs" {
    # Backend bucket must be specified via -backend-config flag during terraform init
    # Example: terraform init -backend-config="bucket=my-terraform-state-bucket"

    prefix = "terraform/state"
  }
}
