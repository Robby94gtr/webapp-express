const express = require('express');
const app = express();
const port = 3001;
//importo il middleware per la gestione degli errori 500
const errorsHandler = require('./middlewares/errorsHandler.js');
//importo il middleware per la gestione degli errori 404
const notFound = require('./middlewares/notFound.js');
//importo il middleware per la gestione del tempo
const checkTime = require('./middlewares/checkTime.js');
const router = require('./router/router.js');

//USO IL MIDDLEWARE checkTime
app.use(checkTime); // usa il middleware per controllare l'orario di accesso

// Middleware to parse JSON bodies
app.use(express.json());

//asset static files from the 'public' directory
app.use(express.static('public'));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');

});

app.use(notFound); // Handle 404 errors
app.use(errorsHandler); // Handle other errors

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Export the app for testing purposes
module.exports = app;