let isLogin = true;

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.status === 404){
        alert("User not found");
        return;
    }

    if (response.status ===401){
        alert("Password is wrong");
        return;
    }

    let data = await response.json();

    if (data.message === "Login successful") {
        localStorage.setItem("user", data.User);
        window.location.href = "index.html";
    } else {
        console.log(data);
        alert("Invalid Login");
        
    }
}


async function toggleForm(){
    isLogin = !isLogin

    const title = document.getElementById('form-title');
    const btn = document.getElementById('submit-btn');
    const toggleLink = document.getElementById('toggle_link');
    const toggleText = document.getElementById('toggle_text');

    if (isLogin){
        title.innerText = "Login";
        btn.innerText = "Login";
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = "Sign Up";
    }
    else {
        title.innerText = "Sign Up";
        btn.innerText = "Create Account";
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Login";
    }
}


async function signUp(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    let data = await response.json()
    if (data.message === "Signup successful, login again"){
        isLogin = !isLogin
        alert("User Added, Login Again");
        window.location.href = "login.html";

    }
}


async function handleSubmit() {
    if (isLogin){
        login();
    }
    else{
        signUp();
    }
    
}