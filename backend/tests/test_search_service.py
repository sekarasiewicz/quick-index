import pytest
import tempfile
import os
from unittest.mock import patch
from app.services.search_service import SearchService


class TestSearchService:
    def setup_method(self):
        """Set up test data before each test method"""
        self.test_data = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
        # Create a service instance but don't load data yet
        self.service = SearchService.__new__(SearchService)
        self.service.data = []

    def test_load_data_success(self):
        """Test successful data loading"""
        with tempfile.NamedTemporaryFile(mode="w", delete=False) as temp_file:
            temp_file.write("\n".join(map(str, self.test_data)))
            temp_file_path = temp_file.name

        with patch("app.services.search_service.settings") as mock_settings:
            mock_settings.input_file = temp_file_path
            service = SearchService()

            assert len(service.data) == 10
            assert service.data == self.test_data

        os.unlink(temp_file_path)

    def test_load_data_file_not_found(self):
        """Test data loading when file doesn't exist"""
        with patch("app.services.search_service.settings") as mock_settings:
            mock_settings.input_file = "nonexistent_file.txt"

            with pytest.raises(FileNotFoundError):
                SearchService()

    def test_binary_search_exact_match(self):
        """Test binary search with exact match"""
        self.service.data = self.test_data

        # Test exact matches
        assert self.service.binary_search(100) == 0
        assert self.service.binary_search(500) == 4
        assert self.service.binary_search(1000) == 9

    def test_binary_search_no_match(self):
        """Test binary search when no exact match exists"""
        self.service.data = self.test_data

        # Test values that don't exist
        assert self.service.binary_search(150) is None
        assert self.service.binary_search(999) is None
        assert self.service.binary_search(0) is None

    def test_binary_search_empty_data(self):
        """Test binary search with empty data"""
        self.service.data = []
        assert self.service.binary_search(100) is None

    def test_find_closest_within_tolerance_exact_match(self):
        """Test finding closest value with exact match"""
        self.service.data = self.test_data

        # Test exact matches (should return the exact index)
        assert self.service.find_closest_within_tolerance(500) == 4
        assert self.service.find_closest_within_tolerance(1000) == 9

    def test_find_closest_within_tolerance_approximate_match(self):
        """Test finding closest value within tolerance"""
        self.service.data = self.test_data

        # Test approximate matches within 10% tolerance
        # 440 is within 10% of 440 (tolerance = 44, diff to 400 = 40, diff to 500 = 60)
        # Should find 400 (closer and within tolerance)
        result = self.service.find_closest_within_tolerance(440)
        assert result == 3  # Index of 400

        # 460 is within 10% of 460 (tolerance = 46, diff to 400 = 60, diff to 500 = 40)
        # Should find 500 (closer and within tolerance)
        result = self.service.find_closest_within_tolerance(460)
        assert result == 4  # Index of 500

    def test_find_closest_within_tolerance_no_match(self):
        """Test finding closest value when no match within tolerance"""
        self.service.data = self.test_data

        # Test values outside tolerance
        # 150 is not within 5% of 150 (tolerance = 7.5, but closest value 100 has diff = 50)
        assert self.service.find_closest_within_tolerance(150, 5.0) is None

    def test_find_closest_within_tolerance_empty_data(self):
        """Test finding closest value with empty data"""
        self.service.data = []
        assert self.service.find_closest_within_tolerance(100) is None

    def test_search_exact_match(self):
        """Test search method with exact match"""
        self.service.data = self.test_data

        value, index, message = self.service.search(500)
        assert value == 500
        assert index == 4
        assert "Exact match" in message

    def test_search_approximate_match(self):
        """Test search method with approximate match"""
        self.service.data = self.test_data

        # Test with a value that should find an approximate match
        # 440 should find 400 within 10% tolerance (diff = 40, tolerance = 44)
        value, index, message = self.service.search(440)
        assert value == 400  # Should find 400
        assert index == 3  # Index of 400
        assert "Approximate match" in message

    def test_search_no_match(self):
        """Test search method when no match is found"""
        self.service.data = self.test_data

        with pytest.raises(ValueError, match="No suitable match found"):
            self.service.search(9999)

    def test_search_edge_cases(self):
        """Test search method with edge cases"""
        self.service.data = self.test_data

        # Test first value
        value, index, message = self.service.search(100)
        assert value == 100
        assert index == 0

        # Test last value
        value, index, message = self.service.search(1000)
        assert value == 1000
        assert index == 9

        # Test value smaller than first
        with pytest.raises(ValueError):
            self.service.search(50)

        # Test value larger than last
        with pytest.raises(ValueError):
            self.service.search(1500)
