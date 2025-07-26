from typing import List, Tuple, Optional
import os
from ..utils.logger import logger
from ..config import settings


class SearchService:
    def __init__(self):
        self.data: List[int] = []
        self._load_data()

    def _load_data(self) -> None:
        """Load data from input file into memory slice"""
        try:
            file_path = os.path.join(os.getcwd(), settings.input_file)
            logger.info(f"Loading data from {file_path}")

            with open(file_path, "r") as file:
                self.data = [int(line.strip()) for line in file if line.strip()]

            logger.info(f"Loaded {len(self.data)} values into memory")

        except FileNotFoundError:
            logger.error(f"Input file not found: {settings.input_file}")
            raise
        except Exception as e:
            logger.error(f"Error loading data: {e}")
            raise

    def binary_search(self, target: int) -> Optional[int]:
        """Binary search for exact match"""
        left, right = 0, len(self.data) - 1

        while left <= right:
            mid = (left + right) // 2
            if self.data[mid] == target:
                return mid
            elif self.data[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return None

    def find_closest_within_tolerance(
        self, target: int, tolerance_percent: float = 10.0
    ) -> Optional[int]:
        """Find closest value within tolerance percentage"""
        if not self.data:
            return None

        tolerance = target * (tolerance_percent / 100.0)
        min_diff = float("inf")
        closest_index = None

        for i, value in enumerate(self.data):
            diff = abs(value - target)
            if diff <= tolerance and diff < min_diff:
                min_diff = diff
                closest_index = i

        return closest_index

    def search(self, target: int) -> Tuple[int, int, str]:
        """
        Search for a value in the dataset

        Returns:
            Tuple of (value, index, message)
        """
        logger.debug(f"Searching for value: {target}")

        # First try exact match with binary search
        exact_index = self.binary_search(target)
        if exact_index is not None:
            logger.info(f"Exact match found for {target} at index {exact_index}")
            return target, exact_index, "Exact match found"

        # If no exact match, try to find closest within 10% tolerance
        closest_index = self.find_closest_within_tolerance(target, 10.0)
        if closest_index is not None:
            closest_value = self.data[closest_index]
            logger.info(
                f"Approximate match found for {target}: {closest_value} at index {closest_index}"
            )
            return (
                closest_value,
                closest_index,
                f"Approximate match within 10% tolerance",
            )

        # No match found
        logger.warning(f"No match found for value {target}")
        raise ValueError(f"No suitable match found for value {target}")
