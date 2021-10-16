SHELL=/bin/bash
DC := docker-compose
IMG := php_apache_mkcert
BASH := docker exec -it $(IMG) bash
PWD := $(shell pwd)
HOSTS := localhost 127.0.0.1 ::1
# HOSTS := example.com "*.example.com" example.test localhost 127.0.0.1 ::1

.PHONY: up
up: ## 開始
	$(DC) up -d

.PHONY: down
down: ## 終了
	$(DC) down

.PHONY: destroy
destroy: ## イメージの削除
	docker rmi $(IMG)

.PHONY: build
build: ## イメージの作成
	$(DC) build

.PHONY: bash
bash: ## コンテナに接続
	$(BASH)

.PHONY: mkcert-install
mkcert-install: ## local CA を作成
	@mkcert -install

.PHONY: mkcert-create
mkcert-create: ## 証明書を作成
	@mkcert -key-file $(PWD)/certs/server.key -cert-file $(PWD)/certs/server.pem $(HOSTS)

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
