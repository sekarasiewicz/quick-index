from pydantic import BaseModel, Field, field_validator


class SearchRequest(BaseModel):
    value: int = Field(..., description="The value to search for", ge=0, le=1000000)

    @field_validator("value")
    @classmethod
    def validate_value(cls, v):
        if not isinstance(v, int):
            raise ValueError("Value must be an integer")
        if v < 0:
            raise ValueError("Value must be non-negative")
        if v > 1000000:
            raise ValueError("Value must not exceed 1,000,000")
        return v


class SearchResponse(BaseModel):
    value: int = Field(..., description="The value that was searched for")
    index: int = Field(..., description="The index of the found value")
    message: str = Field(..., description="Description of the search result")


class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error type")
    message: str = Field(..., description="Detailed error message")
