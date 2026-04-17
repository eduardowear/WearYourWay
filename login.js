const API_BASE_URL = "http://127.0.0.1:3000";

function getFriendlyNetworkMessage() {
    return "No se pudo conectar con el backend. Inicia el servidor en WearYourWay/backend con: node server.js";
}

function normalizeServerMessage(message, fallback) {
    if (!message) {
        return fallback;
    }

    const normalized = String(message).toLowerCase();

    if (
        normalized.includes("faltan las credenciales de sql server") ||
        normalized.includes("configura db_user") ||
        normalized.includes("db_password")
    ) {
        return "El backend esta usando una version anterior. Reinicialo con: node server.js";
    }

    return message;
}

async function requestJson(path, body) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
}

async function register() {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correoReg").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fechaNacimiento = document.getElementById("fecha").value;
    const password = document.getElementById("newPass").value;
    const confirm = document.getElementById("confirmPass").value;

    if (!nombre || !correo || !telefono || !fechaNacimiento || !password || !confirm) {
        alert("Completa todos los campos.");
        return;
    }

    if (password !== confirm) {
        alert("Las contrasenas no coinciden.");
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}$/;
    if (!passwordRegex.test(password)) {
        alert("La contrasena no cumple los requisitos.");
        return;
    }

    try {
        const data = await requestJson("/register", {
            nombre,
            correo,
            telefono,
            fechaNacimiento,
            password
        });

        if (data.success) {
            alert(data.message || "Usuario creado correctamente.");
            document.getElementById("registerBox").style.display = "none";

            document.getElementById("nombre").value = "";
            document.getElementById("correoReg").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("fecha").value = "";
            document.getElementById("newPass").value = "";
            document.getElementById("confirmPass").value = "";
            return;
        }

        alert(normalizeServerMessage(data.message, "Error al crear usuario."));
    } catch (err) {
        alert(getFriendlyNetworkMessage());
    }
}

async function login() {
    try {
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("pass").value;

        const data = await requestJson("/login", { correo, password });

        if (data.success) {
            localStorage.setItem("loggedUser", data.user);
            window.location.href = "index.html";
        } else {
            document.getElementById("errorMsg").innerText = normalizeServerMessage(
                data.message,
                "No se pudo iniciar sesion."
            );
        }
    } catch (err) {
        document.getElementById("errorMsg").innerText = getFriendlyNetworkMessage();
    }
}

function mostrarRegistro() {
    document.getElementById("registerBox").style.display = "block";
}
