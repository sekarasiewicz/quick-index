from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router
from .config import settings
from .utils.logger import logger

# Create FastAPI app
app = FastAPI(
    title="Quick Index API",
    description="A fast search API for sorted numerical data",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api/v1", tags=["search"])


@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    logger.info("Starting Quick Index API")
    logger.info(f"Server will run on {settings.server_host}:{settings.server_port}")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down Quick Index API")


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Quick Index API", "version": "1.0.0", "docs": "/docs"}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.server_host,
        port=settings.server_port,
        reload=True,
    )
