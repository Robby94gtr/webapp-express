const express = require('express');
const app = express();


// Import environment variables from .env file
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const port = process.env.SERVER_PORT || 3000; // Use the port from .env or default to 3000

//  importo e uso il pacchetto cors per gestire le richieste cross-origin
const cors = require('cors');

// Importo il middleware per il cors
app.use(cors({origin: process.env.FE_APP})); // Set CORS origin from environment variable 


//importo il middleware per la gestione degli errori 500
const errorsHandler = require('./middlewares/errorsHandler.js');

//importo il middleware per la gestione degli errori 404
const notFound = require('./middlewares/notFound.js');

//importo il middleware per la gestione del tempo
const checkTime = require('./middlewares/checkTime.js');

// Importo il router
const router = require('./router/router.js');

//USO IL MIDDLEWARE checkTime
app.use(checkTime); // usa il middleware per controllare l'orario di accesso

// Middleware to parse JSON bodies
app.use(express.json());

//asset static files from the 'public' directory
app.use(express.static('public'));

// Use the router for handling routes
app.use('/api', router);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');

});

// Middleware to handle 404 and other errors
app.use(notFound); // Handle 404 errors
app.use(errorsHandler); // Handle other errors

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Export the app for testing purposes
module.exports = app;