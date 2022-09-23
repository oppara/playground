SHELL := /bin/bash


.PHONY: up
up: ## docker-compose up
	docker-compose up -d

.PHONY: down
down: ## docker-compose down
	docker-compose down

.PHONY: destroy
destroy: ## docker-compose down -v
	docker-compose down -v

.PHONY: doc
doc: ## create database documents
	tbls doc

.PHONY: xls
doc: ## create wp_posts table excel document
	tbls out -t xlsx --table wp_posts -o wp_posts.xlsx

.PHONY: setup
setup: ## install k1LoW/tbls
	brew install k1LoW/tap/tbls


.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
