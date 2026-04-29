import pandas as pd
from schemas import ExerciseCreate, ExerciseUpdate
from fastapi import HTTPException

# The "In-Memory" DB
exercises_db = {
    1:{
    "muscle_group": "shoulders",
    "specific_muscle": "NA",
    "name_of_exercise" : "shoulder press",
    "reps": 10,
    "sets": 3
}}

id_counter = 2
users_db = {"admin": "password123"}

def get_all_exercises(search: str = None):
    if not exercises_db:
        return []
    
    list_of_exercises = {}

    if search:
        
        idx = 1
        for exercise in exercises_db.values():
            if exercise["muscle_group"]== search.lower():
                print ("Hitting")
                list_of_exercises.update({idx:exercise})
    else:
        list_of_exercises = exercises_db

    return list_of_exercises

def add_exercises(ex: ExerciseCreate ):
    global id_counter
    name = ex.name_of_exercise.lower()

    for exercise in exercises_db.values():
            if exercise["name_of_exercise"]== name:
                print ("Hitting")
                raise HTTPException(status_code=409, detail="Exercise already exists")
    
    exercise_data = ex.model_dump()
    exercise_data["name_of_exercise"] = name
    exercise_data["muscle_group"] = exercise_data["muscle_group"].lower()
    exercise_data["specific_muscle"] = exercise_data["specific_muscle"].lower()

    exercises_db[id_counter] = exercise_data

    id_counter += 1

    return {"Message": f"New Exercise created - {name}"}

def change_exercise(ex : ExerciseUpdate):

    if exercises_db.get(ex.id) is not None:
        exercises_db[ex.id]=ex.model_dump()
        del exercises_db[ex.id]['id']
        return {"Message": f"Successfully Updated ID {ex.id}"}
    
    raise HTTPException(status_code=401, detail="Exercise Not Found!")


def del_exercise(id:int):
    try:
        
        del exercises_db[id]
        print(f"DEBUG: Attempting to delete ID: {id}", flush=True)
        return {"Message": f"ID successfully deleted {id}"}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Exercise Not Found!")
