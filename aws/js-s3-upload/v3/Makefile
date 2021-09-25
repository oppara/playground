SHELL=/bin/bash


.PHONY: dev
dev: ## start dev server
	npm run start

.PHONY: build
build: ## build
	npm run build

.PHONY: test
test: ## test
	echo test

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
