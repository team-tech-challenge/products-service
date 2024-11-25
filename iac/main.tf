module "application" {
  source = "./modules/generic"

  project_name              = "products-service"
  create_aws_ecr_repository = true
}
