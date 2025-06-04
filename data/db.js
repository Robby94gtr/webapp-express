const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD, // Sostituisci con la tua password
    database: process.env.DB_NAME // Sostituisci con il nome del tuo database
});
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connesso al database MySQL');
});

module.exports = connection;