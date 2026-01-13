# Terraform backend configuration for GCS state storage
# This ensures state persistence across CI/CD runs and enables team collaboration
#
# Prerequisites:
# 1. Create a GCS bucket for storing Terraform state
# 2. Set the TF_VAR_backend_bucket environment variable or pass via -backend-config flag
# 3. Ensure the service account has Storage Object Admin permissions on the bucket
#
# Example initialization:
#   terraform init -backend-config="bucket=your-terraform-state-bucket"

terraform {
  backend "gcs" {
    # Backend bucket should be specified via:
    # 1. TF_VAR_backend_bucket environment variable, or
    # 2. -backend-config="bucket=..." flag during terraform init
    # 
    # Example: terraform init -backend-config="bucket=my-terraform-state-bucket"
    
    prefix = "terraform/state"
  }
}
