from fastapi import APIRouter, HTTPException
from schemas import ExerciseCreate, ExerciseUpdate
from typing import Optional
import database


router = APIRouter()

@router.get("/")
def read_exercises(search: Optional[str] = None):
    return database.get_all_exercises(search)

@router.post("/add")
def create_exercise(ex: ExerciseCreate):
    return database.add_exercises(ex)

@router.put("/modify")
def modify_exercise(ex: ExerciseUpdate):
    return database.change_exercise(ex)

@router.delete("/del")
def delete_exercise(id : int):
    return database.del_exercise(id)
    