import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.services import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health-check")
def health_check():
    return JSONResponse(status_code=200, content={"detail": "Application Health is OK!"})


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000)