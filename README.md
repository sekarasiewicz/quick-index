# Quick Index Search

A fast search API for sorted numerical data with a modern React frontend.

## Features

- **Fast Search**: Binary search algorithm for exact matches
- **Approximate Matching**: 10% tolerance for approximate matches
- **In-Memory Loading**: Data loaded into memory on startup for optimal performance
- **RESTful API**: FastAPI backend with automatic documentation
- **Modern Frontend**: React + TypeScript with Vite
- **Docker Support**: Development and production environments
- **Comprehensive Testing**: Unit tests for both backend and frontend

## Architecture

- **Backend**: FastAPI (Python) with binary search algorithm
- **Frontend**: React + TypeScript + Vite
- **Data**: Sorted numerical data loaded from file
- **Deployment**: Docker Compose for both dev and prod environments

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Running the Application

#### Development Mode

```bash
# Run development environment with Docker
make run-docker-dev
```

#### Production Mode

```bash
# Run production environment with Docker
make run-docker-prod
```

### API Documentation

Once the backend is running, visit:
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## API Endpoints

### Search Endpoint

```
GET /api/v1/search/{value}
```

**Parameters:**
- `value` (integer): The value to search for

**Response:**
```json
{
  "value": 500,
  "index": 4,
  "message": "Exact match found"
}
```

**Error Response:**
```json
{
  "detail": {
    "error": "Value not found",
    "message": "No suitable match found for value 9999"
  }
}
```

### Health Check

```
GET /health
```

Returns: `{"status": "healthy"}`

## Configuration

The backend supports both YAML configuration files and environment variables, with environment variables taking precedence.

### Environment Variables (Recommended)

The following environment variables can be set:

```bash
# Server Configuration
SERVER_PORT=8000
SERVER_HOST=0.0.0.0

# Logging Configuration  
LOG_LEVEL=INFO  # Options: DEBUG, INFO, WARNING, ERROR, CRITICAL

# Data Configuration
INPUT_FILE=data/input.txt
```

### YAML Configuration (Optional)

Backend configuration can optionally be set in a YAML file if needed:

```yaml
server:
  port: 8000
  host: "0.0.0.0"
logging:
  level: "INFO"
data:
  input_file: "data/input.txt"
```

Note: Environment variables always take precedence over YAML configuration.

### Docker Environment

Environment variables are automatically set in Docker Compose files:
- **Development**: `docker-compose.dev.yml` (LOG_LEVEL=DEBUG)
- **Production**: `docker-compose.prod.yml` (LOG_LEVEL=INFO)  
- **Testing**: `docker-compose.test.yml` (LOG_LEVEL=DEBUG)

## Development

### Project Structure

```
quick-index/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   ├── tests/
│   ├── data/
│   └── config/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── src/__tests__/
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── Makefile
```

### Docker Commands

```bash
# Build Docker images
make build-docker

# Stop Docker containers
make stop-docker

# Clean up
make clean
```

## Testing Status

### Backend Tests ✅
- **Search Service**: 23 tests passing
  - Data loading
  - Binary search (exact matches)
  - Approximate search (within tolerance)
  - Error handling
  - Edge cases
- **API Routes**: 10 tests passing
  - Search endpoint responses
  - Error handling
  - Input validation
  - Health and docs endpoints

### Frontend Tests ⚠️
- **API Service**: 4 tests passing
  - Successful API calls
  - Error handling
  - Network failures
- **Component Tests**: Require DOM environment
  - SearchForm component
  - ResultDisplay component  
  - ErrorDisplay component

## Performance

- **Data Loading**: ~100,000 values loaded in ~20ms
- **Search Performance**: O(log n) for exact matches, O(n) for approximate matches
- **Memory Usage**: ~800KB for 100,000 integer values

## Deployment

### Production Docker

```bash
make run-docker-prod
```

This starts:
- Backend API on port 8000
- Frontend served by Caddy on port 80
- All services in production mode

### Environment Variables

For production deployment, you can override the default environment variables:

```bash
# Override default settings
export SERVER_PORT=9000
export LOG_LEVEL=ERROR
export INPUT_FILE=/custom/path/data.txt

# Then run with custom settings
make run-docker-prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is created for recruitment purposes.