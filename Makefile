.PHONY: help build-docker run-docker-dev run-docker-prod stop-docker clean test test-watch test-coverage test-docker test-docker-watch

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

test: ## Run frontend tests
	cd frontend && bun run test

test-watch: ## Run frontend tests in watch mode
	cd frontend && bun run test:watch

test-coverage: ## Run frontend tests with coverage
	cd frontend && bun run test:coverage

test-docker: ## Run frontend tests in Docker
	docker compose -f docker-compose.test.yml up frontend-test --build --abort-on-container-exit

test-docker-watch: ## Run frontend tests in Docker with watch mode
	docker compose -f docker-compose.test.yml up frontend-test-watch --build