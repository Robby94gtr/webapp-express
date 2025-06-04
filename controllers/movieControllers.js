const connection = require('../data/db.js');
 

function getAllMovies(req, res) {
   connection.query('SELECT * FROM movies', (err, results) => {
        if (err) {
             return res.status(500).json({ error: 'Errore nel recupero dei film', details: err.message });
        }
        res.status(200).json(results);
    });
}

function getMovieById(req, res) {
    const movieId = req.params.id;
    connection.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nel recupero del film', details: err.message });
        }
         if (results.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }
        res.status(200).json(results[0]);
    });
}   

function createMovie(req, res) {
    const { title, director,  relase_year } = req.body;
    if (!title || !director || ! relase_year) {
        return res.status(400).json({ error: 'Tutti i campi (title, director,  relase_year) sono obbligatori' });
    }
    connection.query(
        'INSERT INTO movies (title, director, relase_year) VALUES (?, ?, ?)',
        [title, director,  relase_year],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nella creazione del film', details: err.message });
            }
            res.status(201).json({ id: result.insertId, title, director,  relase_year });
        }
    );
}

function updateMovie(req, res) {
    const { title, director,  relase_year } = req.body;
    if (!title || !director || ! relase_year) {
        return res.status(400).json({ error: 'Tutti i campi (title, director,  relase_year) sono obbligatori' });
    }
    connection.query(
        'UPDATE movies SET title = ?, director = ?,  relase_year = ? WHERE id = ?',
        [title, director,  relase_year, movieId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nell\'aggiornamento del film', details: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Film non trovato' });
            }
            res.status(200).json({ id: movieId, title, director,  relase_year });
        }
    );
}

function deleteMovie(req, res) {
    const movieId = req.params.id;
    connection.query('DELETE FROM movies WHERE id = ?', [movieId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nell\'eliminazione del film', details: err.message });;
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }
        res.status(204).send();
    });
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};