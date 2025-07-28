.PHONY: help build-docker run-docker-dev run-docker-prod stop-docker clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build-docker: ## Build Docker images
	docker compose -f docker-compose.prod.yml build

run-docker-dev: ## Run development environment with Docker
	docker compose -f docker-compose.dev.yml up --build

run-docker-prod: ## Run production environment with Docker
	docker compose -f docker-compose.prod.yml up --build -d

stop-docker: ## Stop Docker containers
	docker compose -f docker-compose.dev.yml down
	docker compose -f docker-compose.prod.yml down

clean: ## Clean up generated files
	docker system prune -f