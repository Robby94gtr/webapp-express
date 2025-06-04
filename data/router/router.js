const movies = require('../controllers/moviesControllers.js');
const express = require('express'); 

const router = express.Router();
// Define routes for movies     
router.get('/movies', movies.getAllMovies);
router.get('/movies/:id', movies.getMovieById); 
router.post('/movies', movies.createMovie);
router.put('/movies/:id', movies.updateMovie);
router.delete('/movies/:id', movies.deleteMovie);

// Export the router
module.exports = router;
   
