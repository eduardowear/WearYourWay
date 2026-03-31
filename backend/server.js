const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { sql, connectDB } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Conectar BD
connectDB();



// REGISTER

app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {

        if (!username || !password) {
            return res.json({ error: "Campos vacíos" });
        }

        console.log("📩 Datos recibidos:", username, password);

        //  Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("🔐 Encriptado:", hashedPassword);

        await sql.query`
        INSERT INTO Usuarios (Usuario, Password)
        VALUES (${username}, ${hashedPassword})
        `;

        console.log("✅ Usuario insertado");

        res.json({ success: true });

    } catch (err) {

        console.log("❌ ERROR REGISTER:", err);
        res.status(500).json({ success: false });

    }

});


// LOGIN

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        const result = await sql.query`
        SELECT * FROM Usuarios
        WHERE Usuario = ${username}
        `;

        if (result.recordset.length > 0) {

            const user = result.recordset[0];

            // Comparar contraseña
            const match = await bcrypt.compare(password, user.Password);

            if (match) {

                res.json({
                    success: true,
                    user: username
                });

            } else {

                res.json({ success: false });

            }

        } else {

            res.json({ success: false });

        }

    } catch (err) {

        console.log("❌ ERROR LOGIN:", err);
        res.status(500).json({ success: false });

    }

});


// =======================
// SERVIDOR
// =======================
app.listen(3000, () => {
    console.log("🚀 Servidor en http://localhost:3000");
});