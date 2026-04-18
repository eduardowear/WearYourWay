async function login() {
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("pass").value;

    let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    });

    let data = await res.json();

    const loginBox = document.querySelector(".login-box");

    if (data.success) {
        localStorage.setItem("loggedUser", data.user);
        window.location.href = "index.html";
    } else {
        loginBox.classList.add("error");
        setTimeout(() => loginBox.classList.remove("error"), 500);
        document.getElementById("errorMsg").innerText = "Correo o contraseña incorrectos";
    }
}

async function login() {
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("pass").value;

    let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    });

    let data = await res.json();

    if (data.success) {
        localStorage.setItem("loggedUser", data.user);
        window.location.href = "index.html";
    } else {
        document.getElementById("errorMsg").innerText = "Correo o contraseña incorrectos";
    }
}


