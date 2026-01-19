resource "google_cloud_run_service" "nextjs" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = data.google_service_account.cloudrun.email
      containers {
        image = var.image_url
        ports {
          container_port = 3000
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
        env {
          name  = "ALLOWED_ORIGIN"
          value = var.allowed_origin
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_service_account" "cloudrun" {
  account_id = "housing-price-lab-run"
}

resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.nextjs.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
