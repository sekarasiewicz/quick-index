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

- Python 3.11+
- Node.js 18+ or Bun
- Docker (optional)

### Installation

```bash
# Install all dependencies
make install

# Or install separately
make install-backend
make install-frontend
```

### Running the Application

#### Development Mode

```bash
# Run both backend and frontend
make run-dev

# Or run separately
make run-backend    # Backend on http://localhost:8000
make run-frontend   # Frontend on http://localhost:5173
```

#### Docker Mode

```bash
# Development with Docker
make run-docker-dev

# Production with Docker
make run-docker-prod
```

### Testing

```bash
# Run all tests
make test

# Run backend tests only
make test-backend

# Run frontend tests only
make test-frontend
```

**Note**: Frontend component tests require a proper DOM environment. The API service tests work correctly with Bun's test runner.

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

Backend configuration is in `backend/config/config.yaml`:

```yaml
server:
  port: 8000
  host: "0.0.0.0"
logging:
  level: "INFO"
data:
  input_file: "data/input.txt"
```

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

### Code Quality

```bash
# Lint all code
make lint

# Lint backend only
make lint-backend

# Lint frontend only
make lint-frontend
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
- Frontend served by Nginx on port 80
- All services in production mode

### Environment Variables

For production deployment, consider setting:
- `LOG_LEVEL`: Logging level (DEBUG, INFO, ERROR)
- `API_HOST`: Backend host address
- `API_PORT`: Backend port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is created for recruitment purposes.