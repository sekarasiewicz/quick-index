# Quick Index - Project Plan

## Project Overview
A REST service with a single endpoint that efficiently searches for values in a sorted dataset, plus a React frontend to demonstrate the functionality.

## Data Analysis
- **Input file**: `input.txt` contains 100,002 sorted numbers from 0 to 1,000,000
- **Format**: One number per line, sorted in ascending order
- **Range**: 0, 100, 200, 300, ..., 1,000,000
- **Total entries**: 100,002 (indices 0 to 100,001)

## Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Linting**: Ruff
- **Algorithm**: Binary search for O(log n) performance
- **Data loading**: Load entire file into memory slice on startup
- **Configuration**: YAML/JSON config file for port and log level
- **Logging**: Structured logging with configurable levels (Info, Debug, Error)

### Frontend (React)
- **Framework**: React with TypeScript
- **Build tool**: Vite
- **Package manager**: Bun
- **UI components**: Chakra UI
- **Linting**: Biome
- **Icons**: Lucide React

### Deployment
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Environments**: Separate compose files for development and production

## Project Structure
```
quick-index/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── search_service.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── routes.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── logger.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_search_service.py
│   │   ├── test_api.py
│   │   └── conftest.py
│   ├── data/
│   │   └── input.txt
│   ├── config/
│   │   └── config.yaml
│   ├── requirements.txt
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── ResultDisplay.tsx
│   │   │   └── ErrorDisplay.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── bun.lockb
│   ├── vite.config.ts
│   ├── biome.json
│   ├── Dockerfile
│   └── index.html
├── docker/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── nginx.conf
├── Makefile
├── README.md
├── .gitignore
└── input.txt
```

## Implementation Plan

### Phase 1: Backend Development (Week 1)
1. **Project Setup**
   - Initialize FastAPI project with proper structure
   - Configure Ruff for linting
   - Set up logging configuration
   - Create configuration management

2. **Core Algorithm**
   - Implement binary search algorithm for O(log n) performance
   - Add 10% tolerance logic for approximate matches
   - Create search service with proper error handling

3. **API Development**
   - Design REST endpoint: `GET /search/{value}`
   - Implement request/response models
   - Add input validation
   - Implement error handling

4. **Data Loading**
   - Load input.txt into memory slice on startup
   - Optimize memory usage
   - Add data validation

### Phase 2: Testing & Documentation (Week 1-2)
1. **Unit Tests**
   - Test search algorithm with various scenarios
   - Test API endpoints
   - Test configuration management
   - Test error handling

2. **Documentation**
   - API documentation with FastAPI auto-generation
   - README.md with setup and usage instructions
   - Code documentation

### Phase 3: Frontend Development (Week 2)
1. **Project Setup**
   - Initialize React + TypeScript project with Vite
   - Configure Bun as package manager
   - Set up Chakra UI
   - Configure Biome for linting

2. **UI Components**
   - Search form with input validation
   - Result display component
   - Error handling component
   - Responsive design

3. **API Integration**
   - Create API service layer
   - Implement error handling
   - Add loading states

### Phase 4: Docker & Deployment (Week 2-3)
1. **Containerization**
   - Create Dockerfile for backend
   - Create Dockerfile for frontend
   - Optimize image sizes

2. **Docker Compose**
   - Development environment setup
   - Production environment setup
   - Nginx reverse proxy configuration

3. **Makefile**
   - Build commands
   - Test automation
   - Development server commands
   - Docker commands

### Phase 5: Final Testing & Polish (Week 3)
1. **Integration Testing**
   - End-to-end testing
   - Performance testing
   - Load testing

2. **Code Quality**
   - Linting fixes
   - Code review
   - Performance optimization

3. **Documentation**
   - Final README updates
   - Deployment instructions
   - API documentation

## Technical Specifications

### Backend API
- **Endpoint**: `GET /search/{value}`
- **Response Format**:
  ```json
  {
    "value": 100,
    "index": 1,
    "message": "Exact match found"
  }
  ```
- **Error Response**:
  ```json
  {
    "error": "Value not found",
    "message": "No suitable match found within 10% tolerance"
  }
  ```

### Search Algorithm
- **Primary**: Binary search for exact matches
- **Fallback**: Find closest value within 10% tolerance
- **Performance**: O(log n) for exact matches, O(n) worst case for approximate

### Configuration
- **Port**: Configurable (default: 8000)
- **Log Level**: Info, Debug, Error
- **File Path**: Configurable input file path

### Frontend Features
- **Search Interface**: Clean, responsive form
- **Real-time Results**: Immediate feedback
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

## Success Criteria
- [ ] Backend responds to GET requests within 100ms
- [ ] Binary search correctly finds exact matches
- [ ] 10% tolerance logic works correctly
- [ ] All unit tests pass
- [ ] Frontend successfully communicates with backend
- [ ] Docker containers run without issues
- [ ] Makefile automates all necessary tasks
- [ ] Code follows linting rules
- [ ] Documentation is complete and clear

## Timeline
- **Week 1**: Backend development and testing
- **Week 2**: Frontend development and Docker setup
- **Week 3**: Integration testing and final polish

## Risk Mitigation
- **Performance**: Use binary search for optimal performance
- **Memory**: Load data once at startup, not per request
- **Error Handling**: Comprehensive error handling and logging
- **Testing**: Thorough unit and integration tests
- **Documentation**: Clear setup and usage instructions 