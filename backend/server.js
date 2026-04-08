const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { sql, connectDB } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


// REGISTER
app.post("/register", async (req, res) => {

    const { nombre, correo, telefono, fechaNacimiento, password } = req.body;

    try {

        if (!nombre || !correo || !telefono || !fechaNacimiento || !password) {
            return res.json({ success: false, error: "Campos vacíos" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.query`
        INSERT INTO Usuarios (Nombre, Correo, Telefono, FechaNacimiento, Password)
        VALUES (${nombre}, ${correo}, ${telefono}, ${fechaNacimiento}, ${hashedPassword})
        `;

        res.json({ success: true });

    } catch (err) {

        console.log("❌ ERROR REGISTER:", err);
        res.status(500).json({ success: false });

    }

});


// LOGIN
app.post("/login", async (req, res) => {

    const { correo, password } = req.body;

    try {

        const result = await sql.query`
        SELECT * FROM Usuarios
        WHERE Correo = ${correo}
        `;

        if (result.recordset.length > 0) {

            const user = result.recordset[0];

            const match = await bcrypt.compare(password, user.Password);

            if (match) {

                res.json({
                    success: true,
                    user: user.Nombre
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


app.listen(3000, () => {
    console.log("🚀 Servidor en http://localhost:3000");
});