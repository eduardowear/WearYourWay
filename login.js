async function login() {

    let correo = document.getElementById("correo").value;
    let password = document.getElementById("pass").value;

    let res = await fetch("http://localhost:3000/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo: correo,
            password: password
        })

    });

    let data = await res.json();

    if (data.success) {

        localStorage.setItem("loggedUser", data.user);
        window.location.href = "index.html";

    } else {

        alert("Correo o contraseña incorrectos");

    }

}