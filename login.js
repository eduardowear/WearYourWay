async function login() {

    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    let res = await fetch("http://localhost:3000/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    });

    let data = await res.json();

    if (data.success) {

        localStorage.setItem("loggedUser", data.user);
        window.location.href = "index.html";

    } else {

        alert("Usuario o contraseña incorrectos");

    }

}