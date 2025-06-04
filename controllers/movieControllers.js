const Movie = require('../models/movie');

function getAllMovies(req, res) {
    Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching movies' });
        }
        res.status(200).json(movies);
    });
}

function getMovieById(req, res) {
    const movieId = req.params.id;
    Movie.findById(movieId, (err, movie) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching movie' });
        }
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    });
}   

function createMovie(req, res) {
    const newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating movie' });
        }
        res.status(201).json(movie);
    });
}

function updateMovie(req, res) {
    const movieId = req.params.id;
    Movie.findByIdAndUpdate(movieId, req.body, { new: true }, (err, movie) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating movie' });
        }
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    });
}

function deleteMovie(req, res) {
    const movieId = req.params.id;
    Movie.findByIdAndDelete(movieId, (err, movie) => {  
        if (err) {
            return res.status(500).json({ error: 'Error deleting movie' });
        }
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(204).send(); // No content
    });
}

// Export the controller functions
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};




