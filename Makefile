.PHONY: install test run clean setup-frontend run-frontend

# Backend commands
install:
	cd backend && pip install -r requirements.txt

test:
	cd backend && python -m pytest test_app.py -v

run:
	cd backend && python app.py

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete

# Frontend commands
setup-frontend:
	cd frontend && npm install

run-frontend:
	cd frontend && npm start

# Combined commands
setup: install setup-frontend
	@echo "Setup complete!"

start-all: 
	@echo "Starting backend..."
	cd backend && python app.py &
	@echo "Starting frontend..."
	cd frontend && npm start

help:
	@echo "Available commands:"
	@echo "  install        - Install Python dependencies"
	@echo "  test          - Run unit tests"
	@echo "  run           - Start the backend service"
	@echo "  clean         - Clean Python cache files"
	@echo "  setup-frontend - Install frontend dependencies"
	@echo "  run-frontend  - Start React frontend"
	@echo "  setup         - Setup both backend and frontend"
	@echo "  start-all     - Start both services"