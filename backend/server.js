const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sql, connectDB } = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();


// REGISTRO DE USUARIO

app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {

        await sql.query`
INSERT INTO Usuarios (Usuario,Password)
VALUES (${username},${password})
`;

        res.json({ message: "Usuario creado" });

    } catch (err) {

        res.status(500).json(err);

    }

});


// LOGIN

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        const result = await sql.query`
SELECT * FROM Usuarios
WHERE Usuario=${username} AND Password=${password}
`;

        if (result.recordset.length > 0) {

            res.json({
                success: true,
                user: username
            });

        } else {

            res.json({
                success: false
            });

        }

    } catch (err) {

        res.status(500).json(err);

    }

});



app.listen(3000, () => {

    console.log("Servidor corriendo en puerto 3000");

});