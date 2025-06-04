const movies = require('../controllers/moviesControllers.js');
const express = require('express'); 

const router = express.Router();
// Define routes for movies     
router.get('/movies', movies.index);
router.get('/movies/:id', movies.show); 
router.post('/movies', movies.createMovie);
router.put('/movies/:id', movies.updateMovie);
router.delete('/movies/:id', movies.destroy);

// Export the router
module.exports = router;
   
