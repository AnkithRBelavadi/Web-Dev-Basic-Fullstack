from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import exercises, auth

app = FastAPI()


app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Include the routers
@app.get("/")
def main_route():
    return {"Message":"Backend is working"}

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(exercises.router, prefix="/exercises", tags=["Exercises"])