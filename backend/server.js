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

        //  ESTO VALIDA SI YA EXISTE
        const existe = await sql.query`
            SELECT * FROM Usuarios WHERE Correo = ${correo}
        `;

        if (existe.recordset.length > 0) {
            return res.json({ success: false, error: "El correo ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.query`
            INSERT INTO Usuarios (Nombre, Correo, Telefono, FechaNacimiento, Password)
            VALUES (${nombre}, ${correo}, ${telefono}, ${fechaNacimiento}, ${hashedPassword})
        `;

       

        res.json({ success: true });

    } catch (err) {
        console.log("❌ ERROR REGISTER:", err);
        res.json({ success: false, error: "Error en servidor" });
    }
});


// LOGIN
app.post("/login", async (req, res) => {

    const { correo, password } = req.body;

    try {

        const result = await sql.query`
            SELECT * FROM Usuarios WHERE Correo = ${correo}
        `;

        if (result.recordset.length === 0) {
            return res.json({ success: false, error: "Usuario no existe" });
        }

        const user = result.recordset[0];

        const match = await bcrypt.compare(password, user.Password);

        if (!match) {
            return res.json({ success: false, error: "Contraseña incorrecta" });
        }

        res.json({
            success: true,
            user: user.Nombre
        });

    } catch (err) {
        console.log("❌ ERROR LOGIN:", err);
        res.json({ success: false, error: "Error en servidor" });
    }
});


app.listen(3000, () => {
    console.log("🚀 Servidor en http://localhost:3000");
});
