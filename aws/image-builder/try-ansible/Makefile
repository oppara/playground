BACKET := try-image-builder-with-ansible
AWS_VAULT := aws-vault exec oppara-dev --

all: help

ARN =
.PHONY: start-pipeline
start-pipeline: ## triggers a pipeline to create an image-pipeline
	@$(AWS_VAULT) aws imagebuilder start-image-pipeline-execution --image-pipeline-arn $(ARN)


.PHONY: deploy
deploy: ## deploy cloudformation stack
	@$(AWS_VAULT) rain deploy -y imagebuilder.cf.yml --params BucketName=$(BACKET),AmiName=amzn2


.PHONY: sync-playbook
sync-playbook: ## sync playbook S3 backet
	@$(AWS_VAULT) aws s3 sync playbook s3://$(BACKET)/playbook --delete


.PHONY: upload-component
upload-component: ## upload component.yml to S3
	@$(AWS_VAULT) aws s3 cp component.yml s3://$(BACKET)/component.yml

.PHONY: validate-component
validate-component: ## validate component.yml
	@docker run --rm -v $(CURDIR):/data -w /data oppara/awstoe awstoe validate --documents component.yml

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
