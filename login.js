
// MOSTRAR / OCULTAR REGISTRO
function mostrarRegistro() {
    document.getElementById("registerBox").style.display = "block";
}

function closeRegister() {
    document.getElementById("registerBox").style.display = "none";
}

// ================= VALIDACION DE CONTRASEÑA =================
const passwordInput = document.getElementById("newPass");

passwordInput.addEventListener("input", function () {

    const value = passwordInput.value;

    updateRule("rule-length", value.length >= 12);
    updateRule("rule-upper", /[A-Z]/.test(value));
    updateRule("rule-lower", /[a-z]/.test(value));
    updateRule("rule-symbol", /[\W_]/.test(value));
});

function updateRule(id, valid) {
    const el = document.getElementById(id);
    const text = el.innerText.slice(2);

    el.innerText = (valid ? "✔ " : "X ") + text;
    el.style.color = valid ? "green" : "red";
}

// VALIDAR PASSWORD
function validarPassword(pass) {
    return pass.length >= 12 &&
        /[A-Z]/.test(pass) &&
        /[a-z]/.test(pass) &&
        /[\W_]/.test(pass);
}

// ================= REGISTER =================
async function register() {

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correoReg").value;
    const telefono = document.getElementById("telefono").value;
    const fechaNacimiento = document.getElementById("fecha").value;
    const password = document.getElementById("newPass").value;
    const confirmPass = document.getElementById("confirmPass").value;

    if (!nombre || !correo || !telefono || !fechaNacimiento || !password || !confirmPass) {
        alert("Llena todos los campos");
        return;
    }

    if (!validarPassword(password)) {
        alert("La contraseña no cumple los requisitos");
        return;
    }

    if (password !== confirmPass) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre,
                correo,
                telefono,
                fechaNacimiento,
                password
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Cuenta creada correctamente");
            closeRegister();
        } else {
            alert(data.error);
        }

    } catch (err) {
        console.log(err);
        alert("Error de conexión");
    }
}

// ================= LOGIN =================
async function login() {

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("pass").value;

    if (!correo || !password) {
        document.getElementById("errorMsg").innerText = "Llena todos los campos";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        });

        const data = await res.json();

        if (data.success) {

            
            localStorage.setItem("loggedUser", data.user.nombre);
            localStorage.setItem("correoUsuario", data.user.correo);

            // (opcional)
            localStorage.setItem("usuario", JSON.stringify(data.user));

            window.location.href = "index.html";

        } else {
            document.getElementById("errorMsg").innerText = data.error;
        }

    } catch (err) {
        console.log(err);
        alert("Error de conexión");
    }
}