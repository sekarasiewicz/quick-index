.PHONY: help install-backend install-frontend test-backend test-frontend run-backend run-frontend build-docker run-docker-dev run-docker-prod clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install-backend: ## Install backend dependencies
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

install-frontend: ## Install frontend dependencies
	cd frontend && bun install

install: install-backend install-frontend ## Install all dependencies

test-backend: ## Run backend tests
	cd backend && source venv/bin/activate && python -m pytest tests/ -v

test-frontend: ## Run frontend tests
	cd frontend && bun test

test: test-backend test-frontend ## Run all tests

run-backend: ## Run backend development server
	cd backend && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

run-frontend: ## Run frontend development server
	cd frontend && bun run dev

run-dev: run-backend run-frontend ## Run both development servers

build-docker: ## Build Docker images
	docker-compose -f docker-compose.prod.yml build

run-docker-dev: ## Run development environment with Docker
	docker-compose -f docker-compose.dev.yml up --build

run-docker-prod: ## Run production environment with Docker
	docker-compose -f docker-compose.prod.yml up --build -d

stop-docker: ## Stop Docker containers
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.prod.yml down

clean: ## Clean up generated files
	rm -rf backend/venv
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	docker system prune -f

lint-backend: ## Lint backend code
	cd backend && source venv/bin/activate && ruff check app/

lint-frontend: ## Lint frontend code
	cd frontend && bunx @biomejs/biome check src/

lint: lint-backend lint-frontend ## Lint all code