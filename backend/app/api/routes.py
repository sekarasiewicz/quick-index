from fastapi import APIRouter, HTTPException, Path, Depends
from pydantic import Field, ValidationError
from ..models import SearchResponse, ErrorResponse
from ..services.search_service import SearchService
from ..utils.logger import logger

router = APIRouter()
search_service = SearchService()


def validate_search_value(
    value: int = Path(..., description="The value to search for (0-1,000,000)"),
) -> int:
    """Validate search value bounds and type"""
    if value < 0:
        raise HTTPException(
            status_code=422,
            detail={
                "error": "Validation error",
                "message": "Value must be non-negative",
            },
        )

    if value > 1000000:
        raise HTTPException(
            status_code=422,
            detail={
                "error": "Validation error",
                "message": "Value must not exceed 1,000,000",
            },
        )

    return value


@router.get(
    "/search/{value}",
    response_model=SearchResponse,
    responses={
        200: {"description": "Search successful"},
        404: {"model": ErrorResponse, "description": "Value not found"},
        422: {"model": ErrorResponse, "description": "Validation error"},
    },
)
async def search_value(
    validated_value: int = Depends(validate_search_value),
):
    """
    Search for a value in the dataset

    Args:
        validated_value: The validated value to search for (0-1,000,000)

    Returns:
        SearchResponse with the found value, index, and message
    """
    try:
        logger.info(f"Received search request for value: {validated_value}")

        found_value, index, message = search_service.search(validated_value)

        response = SearchResponse(value=found_value, index=index, message=message)

        logger.info(f"Search successful: {response}")
        return response

    except ValueError as e:
        logger.warning(f"Search failed for value {validated_value}: {e}")
        raise HTTPException(
            status_code=404, detail={"error": "Value not found", "message": str(e)}
        )
    except Exception as e:
        logger.error(f"Unexpected error during search: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": "An unexpected error occurred",
            },
        )
