from pydantic import BaseModel
from typing import Optional

class ExerciseBase(BaseModel):
    muscle_group: str
    specific_muscle: str
    name_of_exercise : str
    reps: int
    sets: int

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseUpdate(ExerciseBase):
    id: int

class UserLogin(BaseModel):
    username: str
    password: str