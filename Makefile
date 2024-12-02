init:
	cd iac/ && terraform init -upgrade -backend-config="bucket=techchallenge-bucket-s3" -backend-config="key=products-service/terraform.tfstate" -backend-config="region=us-east-1" && cd ../

plan:
	cd iac/ && terraform plan && cd ../

apply:
	cd iac/ && terraform apply -auto-approve && cd ../

destroy:
	cd iac/ && terraform destroy -auto-approve && cd ../

fmt:
	cd iac/ && terraform fmt -recursive && cd ../

validate:
	cd iac/ && terraform validate && cd ../

kube-config:
	aws eks --region us-east-1 update-kubeconfig --name cluster-tech-challenge
