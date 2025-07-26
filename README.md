# Number Search Service

A REST API service with React frontend for efficiently searching values in a sorted dataset using binary search algorithm.

## Features

- **Fast Binary Search**: O(log n) search algorithm for optimal performance
- **Approximate Matching**: Returns closest match within 10% tolerance if exact match not found
- **Configurable**: YAML configuration for port, log level, and input file
- **Comprehensive Logging**: Configurable log levels (DEBUG, INFO, ERROR)
- **Unit Tests**: Complete test coverage for core functionality
- **React Frontend**: Interactive UI to demonstrate API functionality
- **Health Check**: Endpoint to verify service status

## Project Structure

```
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.yaml         # Configuration file
│   ├── requirements.txt    # Python dependencies
│   └── test_app.py        # Unit tests
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   │   └── index.html     # HTML template
│   └── package.json       # Node.js dependencies
├── input.txt              # Sample sorted data file
├── Makefile              # Automation commands
└── README.md             # This file
```

## API Endpoints

### Search Endpoint
- **URL**: `GET /search/<value>`
- **Description**: Search for a value and return its index
- **Response**: 
  ```json
  {
    "success": true,
    "data": {
      "index": 3,
      "value": 100,
      "message": "Exact match found"
    }
  }
  ```

### Health Check
- **URL**: `GET /health`
- **Description**: Check service health and data status
- **Response**:
  ```json
  {
    "status": "healthy",
    "data_loaded": true,
    "total_values": 52
  }
  ```

## Setup and Installation

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup
```bash
# Install Python dependencies
make install

# Or manually:
cd backend
pip install -r requirements.txt
```

### Frontend Setup
```bash
# Install Node.js dependencies
make setup-frontend

# Or manually:
cd frontend
npm install
```

### Complete Setup
```bash
# Setup both backend and frontend
make setup
```

## Running the Application

### Start Backend Only
```bash
make run
# Backend will be available at http://localhost:5000
```

### Start Frontend Only
```bash
make run-frontend
# Frontend will be available at http://localhost:3000
```

### Start Both Services
```bash
make start-all
```

## Configuration

Edit `backend/config.yaml` to customize:

```yaml
port: 5000                # Server port
log_level: INFO          # Log level: DEBUG, INFO, ERROR
input_file: ../input.txt # Path to sorted data file
```

## Testing

Run unit tests:
```bash
make test
```

This will run all unit tests including:
- Binary search functionality
- Approximate matching logic
- API endpoint testing
- Configuration loading
- Error handling

## Algorithm Details

### Binary Search Implementation
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Tolerance**: 10% for approximate matches

### Search Logic
1. Load sorted data into memory slice at startup
2. Use binary search for exact match
3. If no exact match, check neighbors within 10% tolerance
4. Return closest match or error if none found

## Usage Examples

### Using the API directly
```bash
# Search for exact value
curl http://localhost:5000/search/100

# Search for approximate value
curl http://localhost:5000/search/105

# Health check
curl http://localhost:5000/health
```

### Using the Frontend
1. Open http://localhost:3000
2. Enter a number in the search field
3. Click "Search" to see results
4. View index, value, and match type

## Sample Data

The `input.txt` file contains sorted numbers:
```
0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, ...
```

## Error Handling

- **404**: Value not found within tolerance
- **500**: Internal server error
- **Invalid input**: Non-numeric values rejected

## Development

### Adding New Features
1. Update the `SearchService` class in `app.py`
2. Add corresponding tests in `test_app.py`
3. Update frontend components if needed
4. Run tests to ensure functionality

### Logging
Configure log levels in `config.yaml`:
- **DEBUG**: Detailed search operations
- **INFO**: General service information
- **ERROR**: Error messages only

## Performance

- **Startup**: O(n) to load data into memory
- **Search**: O(log n) binary search
- **Memory**: O(n) to store sorted data slice

For 1M values:
- Load time: ~100ms
- Search time: ~20 operations maximum
- Memory usage: ~8MB for integer array

## License

This project is provided as-is for demonstration purposes.