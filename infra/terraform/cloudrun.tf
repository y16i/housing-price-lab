resource "google_cloud_run_service" "nextjs" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = google_service_account.cloudrun.email
      containers {
        image = var.image_url
        ports {
          container_port = 3000
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_service_account" "cloudrun" {
  account_id   = "housing-price-lab-run"
  display_name = "Cloud Run Service Account"
}

resource "google_service_account_iam_member" "github_actions_impersonate" {
  service_account_id = google_service_account.cloudrun.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:github-actions@housing-prie-lab.iam.gserviceaccount.com"
}

resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.nextjs.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
