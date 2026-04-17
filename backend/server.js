const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const localUsersPath = path.join(__dirname, "users.local.json");

app.use(bodyParser.json());
app.use(cors());

async function readLocalUsers() {
    try {
        const content = await fs.readFile(localUsersPath, "utf8");
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        if (err.code === "ENOENT") {
            return [];
        }

        throw err;
    }
}

async function writeLocalUsers(users) {
    await fs.writeFile(localUsersPath, JSON.stringify(users, null, 2), "utf8");
}

function validateRequiredFields({ nombre, correo, password, telefono, fechaNacimiento }) {
    return nombre && correo && password && telefono && fechaNacimiento;
}

function normalizeIdentifier(value) {
    return String(value || "").trim().toLowerCase();
}

function getLocalPart(correo) {
    const [localPart = ""] = String(correo || "").toLowerCase().split("@");
    return localPart;
}

function matchesIdentifier(user, identifier) {
    const normalizedIdentifier = normalizeIdentifier(identifier);
    if (!normalizedIdentifier) {
        return false;
    }

    const nombre = normalizeIdentifier(user.nombre);
    const correo = normalizeIdentifier(user.correo);
    const localPart = getLocalPart(correo);

    return (
        correo === normalizedIdentifier ||
        nombre === normalizedIdentifier ||
        localPart === normalizedIdentifier ||
        localPart.startsWith(normalizedIdentifier)
    );
}

app.get("/health", async (req, res) => {
    res.json({
        success: true,
        configured: false,
        storage: "local-file",
        message: "Backend disponible con almacenamiento local"
    });
});

app.post("/register", async (req, res) => {
    const { nombre, correo, password, telefono, fechaNacimiento } = req.body;

    try {
        if (!validateRequiredFields({ nombre, correo, password, telefono, fechaNacimiento })) {
            return res.status(400).json({
                success: false,
                message: "Completa todos los campos obligatorios"
            });
        }

        const users = await readLocalUsers();
        const existingUser = users.find((user) => user.correo.toLowerCase() === correo.toLowerCase());

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "El correo ya esta registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            nombre,
            correo,
            telefono,
            fechaNacimiento,
            password: hashedPassword
        });

        await writeLocalUsers(users);

        res.json({
            success: true,
            message: "Usuario registrado correctamente"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { correo, password } = req.body;

    try {
        const users = await readLocalUsers();
        const user = users.find((item) => matchesIdentifier(item, correo));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado. Prueba con tu correo, nombre o usuario."
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Contrasena incorrecta"
            });
        }

        res.json({ success: true, user: user.nombre });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(3000, () => {
    console.log("Backend local activo en http://127.0.0.1:3000");
});
