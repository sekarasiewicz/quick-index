from fastapi import APIRouter, HTTPException
from ..models import SearchResponse, ErrorResponse
from ..services.search_service import SearchService
from ..utils.logger import logger

router = APIRouter()
search_service = SearchService()


@router.get(
    "/search/{value}",
    response_model=SearchResponse,
    responses={
        200: {"description": "Search successful"},
        404: {"model": ErrorResponse, "description": "Value not found"},
        422: {"model": ErrorResponse, "description": "Validation error"},
    },
)
async def search_value(value: int):
    """
    Search for a value in the dataset

    Args:
        value: The value to search for

    Returns:
        SearchResponse with the found value, index, and message
    """
    try:
        logger.info(f"Received search request for value: {value}")

        found_value, index, message = search_service.search(value)

        response = SearchResponse(value=found_value, index=index, message=message)

        logger.info(f"Search successful: {response}")
        return response

    except ValueError as e:
        logger.warning(f"Search failed for value {value}: {e}")
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
