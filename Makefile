.PHONY: help build-docker run-docker-dev run-docker-prod stop-docker clean test test-watch test-coverage test-docker test-docker-watch test-backend-docker test-backend-docker-watch run-docker-dev-custom run-docker-prod-custom

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build-docker: ## Build Docker images
	docker compose -f docker-compose.prod.yml build

run-docker-dev: ## Run development environment with Docker
	docker compose -f docker-compose.dev.yml up --build

run-docker-dev-custom: ## Run development with custom environment variables
	@echo "Running development environment with custom settings..."
	@echo "You can override: SERVER_PORT, LOG_LEVEL, INPUT_FILE"
	SERVER_PORT=9000 LOG_LEVEL=DEBUG docker compose -f docker-compose.dev.yml up --build

run-docker-prod: ## Run production environment with Docker
	docker compose -f docker-compose.prod.yml up --build -d

run-docker-prod-custom: ## Run production with custom environment variables
	@echo "Running production environment with custom settings..."
	@echo "You can override: SERVER_PORT, LOG_LEVEL, INPUT_FILE"
	SERVER_PORT=9000 LOG_LEVEL=ERROR docker compose -f docker-compose.prod.yml up --build -d

stop-docker: ## Stop Docker containers
	docker compose -f docker-compose.dev.yml down
	docker compose -f docker-compose.prod.yml down

clean: ## Clean up generated files
	docker system prune -f

test: ## Run frontend tests locally
	cd frontend && npm test

test-watch: ## Run frontend tests locally with watch mode
	cd frontend && npm run test:watch

test-coverage: ## Run frontend tests with coverage
	cd frontend && npm run test:coverage

test-docker: ## Run frontend tests in Docker
	docker compose -f docker-compose.test.yml up frontend-test --build --abort-on-container-exit

test-docker-watch: ## Run frontend tests in Docker with watch mode
	docker compose -f docker-compose.test.yml up frontend-test-watch --build

test-backend-docker: ## Run backend tests in Docker
	docker compose -f docker-compose.test.yml up backend-test --build --abort-on-container-exit

test-backend-docker-watch: ## Run backend tests in Docker with watch mode
	docker compose -f docker-compose.test.yml up backend-test-watch --build