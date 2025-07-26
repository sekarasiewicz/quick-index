# Quick Index Search

A high-performance REST API with React frontend for searching through sorted numerical data using binary search algorithm.

## 🚀 Features

- **Fast Binary Search**: O(log n) performance for exact matches
- **Approximate Matching**: 10% tolerance for near matches
- **Real-time Search**: Instant results with loading states
- **Modern UI**: Clean, responsive interface
- **Docker Support**: Easy deployment with Docker Compose
- **Comprehensive Testing**: Unit tests for all components
- **Configurable**: YAML configuration for port and log levels

## 📊 Data

The application searches through a dataset of 100,002 sorted numbers from 0 to 1,000,000 (increments of 100). The data is loaded into memory on startup for optimal performance.

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Algorithm**: Binary search with 10% tolerance fallback
- **Linting**: Ruff
- **Configuration**: YAML config file
- **Logging**: Structured logging with configurable levels

### Frontend (React)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Linting**: Biome
- **Icons**: Lucide React

### Deployment
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Environments**: Separate dev/prod configurations

## 🛠️ Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Bun (for frontend)
- Docker & Docker Compose (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quick-index
   ```

2. **Install dependencies**
   ```bash
   make install
   ```

3. **Run development servers**
   ```bash
   make run-dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📖 Usage

### API Endpoints

#### Search for a value
```http
GET /api/v1/search/{value}
```

**Example:**
```bash
curl "http://localhost:8000/api/v1/search/100"
```

**Response:**
```json
{
  "value": 100,
  "index": 1,
  "message": "Exact match found"
}
```

#### Health check
```http
GET /health
```

### Frontend Interface

1. Enter a number in the search field (0-1,000,000)
2. Click "Search" or press Enter
3. View results showing:
   - Found value
   - Index position
   - Match type (exact or approximate)
   - Status message

## 🧪 Testing

### Run all tests
```bash
make test
```

### Backend tests only
```bash
make test-backend
```

### Frontend tests only
```bash
make test-frontend
```

## 🐳 Docker Deployment

### Development
```bash
make run-docker-dev
```

### Production
```bash
make run-docker-prod
```

### Stop containers
```bash
make stop-docker
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/config/config.yaml`:

```yaml
server:
  port: 8000
  host: "0.0.0.0"

logging:
  level: "INFO"  # Options: DEBUG, INFO, ERROR

data:
  input_file: "data/input.txt"
```

### Environment Variables
- `VITE_API_URL`: Frontend API base URL (default: http://localhost:8000)

## 📁 Project Structure

```
quick-index/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── main.py
│   │   └── models.py
│   ├── tests/
│   ├── data/
│   ├── config/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Makefile
└── README.md
```

## 🚀 Available Commands

```bash
make help                    # Show all available commands
make install                 # Install all dependencies
make test                    # Run all tests
make run-dev                 # Start development servers
make run-docker-dev          # Run with Docker (dev)
make run-docker-prod         # Run with Docker (prod)
make lint                    # Lint all code
make clean                   # Clean up files
```

## 🔍 Search Algorithm

### Binary Search
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Use Case**: Exact value matches

### Approximate Search
- **Time Complexity**: O(n) worst case
- **Tolerance**: 10% of target value
- **Use Case**: When exact match not found

### Example
- Search for 1150 → Returns 1100 or 1200 (within 10% tolerance)
- Search for 1000 → Returns exact match at index 10

## 📝 Logging

The application uses structured logging with configurable levels:

- **DEBUG**: Detailed debugging information
- **INFO**: General application flow
- **ERROR**: Error conditions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting: `make lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review the logs for error details
3. Open an issue in the repository