const sql = require("mssql");

const config = {
    user: "sa",
    password: "1234",
    server: "DESKTOP-U1I9D6A",
    database: "wearyourway",
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("Conectado a SQL Server");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { sql, connectDB };