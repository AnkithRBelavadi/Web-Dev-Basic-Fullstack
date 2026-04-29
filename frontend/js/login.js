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

    let data = await response.json();

    if (data.message === "Login successful") {
        localStorage.setItem("user", data.User);
        window.location.href = "index.html";
    } else {
        document.getElementById("msg").innerText = "Invalid Login";
    }
}