output "cloud_run_url" {
  value = google_cloud_run_service.nextjs.status[0].url
}
