const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const { sql, connectDB } = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();


// REGISTRO DE USUARIO

app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {

        // 🔐 Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.query`
        INSERT INTO Usuarios (Usuario, Password)
        VALUES (${username}, ${hashedPassword})
        `;

        res.json({ message: "Usuario creado" });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: "Error al registrar usuario" });

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

            // 🔐 Comparar contraseña
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

        console.log(err);
        res.status(500).json({ error: "Error en el login" });

    }

});


app.listen(3000, () => {

    console.log("Servidor corriendo en puerto 3000");

});