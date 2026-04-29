const API = "http://127.0.0.1:8000";

// LOAD EXERCISES
async function loadExercises() {
    const res = await fetch(`${API}/exercises`);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    Object.entries(data).forEach(([id, ex]) => {
        list.innerHTML += `
            <div class="card">
                ${id}
                <b>${ex.name_of_exercise}</b><br>
                Muscle Group: ${ex.muscle_group}<br>
                Specific Muscle: ${ex.specific_muscle}<br>
                Reps: ${ex.reps} | Sets: ${ex.sets}<br>
                <button onclick="deleteExercise(${id})">Delete</button>
            </div>
        `;
    });
}

// ADD EXERCISE
async function addExercise() {
    const body = {
        name_of_exercise: document.getElementById("name").value,
        muscle_group: document.getElementById("muscle").value,
        specific_muscle: document.getElementById("specific").value,
        reps: parseInt(document.getElementById("reps").value),
        sets: parseInt(document.getElementById("sets").value)
    };

    await fetch(`${API}/exercises/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    loadExercises();
}

// MODIFY EXERCISE (basic example)
async function modifyExercise() {

        const body = {
        muscle_group: document.getElementById("modMuscle_group").value,
        specific_muscle: document.getElementById("modSpecific_muscle").value,
        name_of_exercise: document.getElementById("modName_of_exercise").value,
        reps: parseInt(document.getElementById("modReps").value),
        sets: parseInt(document.getElementById("modSets").value),
        id: parseInt(document.getElementById("modId").value)
    };

    await fetch(`${API}/exercises/modify`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    loadExercises();
}

async function deleteExercise(id){
    console.log(id)
        await fetch(`${API}/exercises/del?id=${id}`, {
        method: "DELETE"
    });

    loadExercises();
    
}

async function logout(){
    alert("You have been logged out, Login Again to view");
    localStorage.removeItem('user');
    window.location.href="index.html"

}
// INITIAL LOAD

async function loadHeader(){
    const header = document.getElementById("centrebar")
    let name = localStorage.getItem("user")
    name = name.toUpperCase()
    header.innerHTML+=`<h1> WELCOME ${name} </h1> 
    <button onclick="logout()" id="logout">Logout</button>`
}
loadHeader();
loadExercises();