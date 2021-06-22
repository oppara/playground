BACKET := s3://try-image-builder-with-ansible
AWS_VAULT := aws-vault exec oppara-dev --

all: help

.PHONY: sync-playbook
sync-playbook: ## sync playbook S3 backet
	@$(AWS_VAULT) aws s3 sync playbook $(BACKET)/playbook --delete


.PHONY: upload-component
upload-component: ## upload component.yml to S3
	@$(AWS_VAULT) aws s3 cp component.yml $(BACKET)/component.yml

.PHONY: validate-component
validate-component: ## validate component.yml
	@docker run --rm -v $(CURDIR):/data -w /data oppara/awstoe awstoe validate --documents component.yml

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
