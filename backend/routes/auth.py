from fastapi import APIRouter,  HTTPException
from schemas import UserLogin
from database import users_db

router = APIRouter()



@router.post("/login")
def get_user(details: UserLogin):
    


    if users_db.get(details.username) is None:
        raise HTTPException(status_code=404, detail="User not Found")
    
    if users_db[details.username] != details.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    

    return {"User" : details.username,"message": "Login successful"}


    

@router.post("/signup")
def signup_user(details: UserLogin):
    

    if users_db.get(details.username) is not None:
        raise HTTPException(status_code=409, detail="User already exists, try with a different username")
    
    users_db[details.username]=details.password
    

    return {"User" : details.username,"message": "Signup successful, login again"}


    