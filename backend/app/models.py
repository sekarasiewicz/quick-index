from pydantic import BaseModel, Field
from typing import Optional


class SearchResponse(BaseModel):
    value: int = Field(..., description="The value that was searched for")
    index: int = Field(..., description="The index of the found value")
    message: str = Field(..., description="Description of the search result")


class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error type")
    message: str = Field(..., description="Detailed error message")
