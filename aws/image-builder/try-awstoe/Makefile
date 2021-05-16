
TARGET=

DOCKER = docker run --rm \
	-v $(CURDIR):/data \
	-w /data oppara/awstoe awstoe

.PHONY: validate
validate: ## make validate TARGET=/path/to/target.yaml
	@$(DOCKER) validate --documents $(TARGET)

.PHONY: run
run: ## make run TARGET=/path/to/target.yaml
	@$(DOCKER) run --documents $(TARGET)

.PHONY: build
build: ## build docker image
	docker build -t oppara/awstoe:latest .

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
