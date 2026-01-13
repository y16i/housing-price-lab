# Terraform Configuration for Cloud Run Deployment

This directory contains Terraform configuration for deploying the application to Google Cloud Run.

## Prerequisites

1. **GCP Project**: A Google Cloud Platform project with billing enabled
2. **Service Account**: A service account with the following permissions:
   - Cloud Run Admin
   - Storage Object Admin (for Terraform state)
3. **GCS Bucket**: A Google Cloud Storage bucket for storing Terraform state

## Backend Configuration

Terraform state is stored in a GCS bucket to ensure:
- State persistence across CI/CD runs
- Team collaboration on infrastructure changes
- State locking to prevent concurrent modifications

### Setting up the Backend Bucket

1. Create a GCS bucket for Terraform state:
   ```bash
   gsutil mb -p YOUR_PROJECT_ID -l asia-northeast1 gs://YOUR_BUCKET_NAME
   ```

2. Enable versioning (recommended):
   ```bash
   gsutil versioning set on gs://YOUR_BUCKET_NAME
   ```

3. Configure the bucket name as a GitHub secret:
   - Secret name: `TF_STATE_BUCKET`
   - Secret value: Your bucket name (e.g., `my-terraform-state-bucket`)

## GitHub Actions Secrets

The following secrets must be configured in your GitHub repository:

- `WIF_PROVIDER`: Workload Identity Federation provider
- `WIF_SERVICE_ACCOUNT`: Service account email for authentication
- `GCP_PROJECT`: Google Cloud project ID
- `TF_STATE_BUCKET`: GCS bucket name for Terraform state

## Local Development

To use this configuration locally:

```bash
# Initialize Terraform with backend configuration
terraform init -backend-config="bucket=YOUR_BUCKET_NAME"

# Plan changes
terraform plan -var="project_id=YOUR_PROJECT_ID" -var="image_url=YOUR_IMAGE_URL"

# Apply changes
terraform apply -var="project_id=YOUR_PROJECT_ID" -var="image_url=YOUR_IMAGE_URL"
```

## Configuration Files

- `backend.tf`: Backend configuration for GCS state storage
- `providers.tf`: Provider configuration and version requirements
- `variables.tf`: Input variables for the configuration
- `cloudrun.tf`: Cloud Run service and IAM configuration
- `outputs.tf`: Output values from the configuration
