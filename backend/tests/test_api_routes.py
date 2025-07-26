from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)


class TestSearchAPI:
    def setup_method(self):
        """Set up test data before each test method"""
        self.test_data = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

    @patch("app.api.routes.search_service")
    def test_search_exact_match(self, mock_search_service):
        """Test search endpoint with exact match"""
        # Mock the search service response
        mock_search_service.search.return_value = (500, 4, "Exact match found")

        response = client.get("/api/v1/search/500")

        assert response.status_code == 200
        data = response.json()
        assert data["value"] == 500
        assert data["index"] == 4
        assert data["message"] == "Exact match found"

        # Verify the service was called with correct parameter
        mock_search_service.search.assert_called_once_with(500)

    @patch("app.api.routes.search_service")
    def test_search_approximate_match(self, mock_search_service):
        """Test search endpoint with approximate match"""
        # Mock the search service response
        mock_search_service.search.return_value = (
            500,
            4,
            "Approximate match within 10% tolerance",
        )

        response = client.get("/api/v1/search/450")

        assert response.status_code == 200
        data = response.json()
        assert data["value"] == 500
        assert data["index"] == 4
        assert data["message"] == "Approximate match within 10% tolerance"

    @patch("app.api.routes.search_service")
    def test_search_not_found(self, mock_search_service):
        """Test search endpoint when value is not found"""
        # Mock the search service to raise ValueError
        mock_search_service.search.side_effect = ValueError(
            "No suitable match found for value 9999"
        )

        response = client.get("/api/v1/search/9999")

        assert response.status_code == 404
        data = response.json()
        assert data["detail"]["error"] == "Value not found"
        assert "No suitable match found" in data["detail"]["message"]

    @patch("app.api.routes.search_service")
    def test_search_internal_error(self, mock_search_service):
        """Test search endpoint with internal server error"""
        # Mock the search service to raise a generic exception
        mock_search_service.search.side_effect = Exception("Database connection failed")

        response = client.get("/api/v1/search/500")

        assert response.status_code == 500
        data = response.json()
        assert data["detail"]["error"] == "Internal server error"
        assert data["detail"]["message"] == "An unexpected error occurred"

    def test_search_invalid_input(self):
        """Test search endpoint with invalid input"""
        # Test with non-numeric value
        response = client.get("/api/v1/search/abc")

        assert response.status_code == 422  # Validation error

    def test_search_negative_number(self):
        """Test search endpoint with negative number"""
        response = client.get("/api/v1/search/-100")

        # Should be valid input (negative numbers are allowed)
        assert response.status_code in [200, 404]  # Either success or not found

    def test_search_large_number(self):
        """Test search endpoint with very large number"""
        response = client.get("/api/v1/search/999999999")

        # Should be valid input (large numbers are allowed)
        assert response.status_code in [200, 404]  # Either success or not found

    def test_root_endpoint(self):
        """Test root endpoint"""
        response = client.get("/")

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Quick Index API"
        assert data["version"] == "1.0.0"
        assert "docs" in data

    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"

    def test_docs_endpoint(self):
        """Test that docs endpoint is accessible"""
        response = client.get("/docs")

        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
