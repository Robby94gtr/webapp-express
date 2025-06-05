const connection = require('../data/db.js');
//index
function index(req, res) {
    connection.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nel recupero dei film', details: err.message });
        }
        res.status(200).json(results);
    });
}
//get id
function show(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'ID mancante' });
    }
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId) || movieId <= 0) {
        return res.status(400).json({ error: 'ID non valido' });
    }
    // Query per recuperare il film con l'ID specificato
    const sqlmovie = 'SELECT * FROM movies WHERE id = ?';
    // Query per recuperare le recensioni del film
    const sqlreviews = 'SELECT * FROM reviews WHERE movie_id = ?';
    //media reviews
    const sqlmedia = 'SELECT AVG(vote) as average_rating FROM reviews WHERE movie_id = ?';
    // Recupera il film con l'ID specificato
    connection.query(sqlmovie, [movieId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nel recupero del film', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }
        const movie = results[0];
        // Recupera le recensioni del film
        connection.query(sqlreviews, [movieId], (err, reviews) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nel recupero delle recensioni', details: err.message });
            }
            movie.reviews = reviews || [];
            // Recupera la media delle recensioni
            connection.query(sqlmedia, [movieId], (err, mediaResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Errore nel calcolo della media delle recensioni', details: err.message });
                }
                if (mediaResults.length > 0) {
                    // Arrotonda la media all'intero più vicino
                    movie.average_rating = Math.round(mediaResults[0].average_rating) || 0;
                } else {
                    movie.average_rating = 0;
                }
                res.status(200).json(movie);
            });
        }
        );
    });
}

//post
function store(req, res) {
    const { title, director, release_year, genre, abstract } = req.body;
    // Multer salva il file in req.file
    const image = req.file ? req.file.filename : null;
    if (!title || !director || !release_year || !genre || !abstract || !image) {
        return res.status(400).json({ error: 'Tutti i campi (title, director, release_year, genre, abstract, image) sono obbligatori' });
    }
    const sqlnewmovie = 'INSERT INTO movies (title, director, release_year, genre, abstract, image) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(sqlnewmovie,
        [title, director, release_year, genre, abstract, image],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nella creazione del film', details: err.message });
            }
            res.status(201).json({ id: result.insertId, title, director, release_year, genre, abstract, image });
        }
    );
}

//put
function updateMovie(req, res) {
    const movieId = req.params.id;
    const { title, director, release_year, genre, abstract } = req.body;
    const image = req.file ? req.file.filename : req.body.image; // aggiorna solo se arriva un nuovo file

    if (!title || !director || !release_year || !genre || !abstract) {
        return res.status(400).json({ error: 'Tutti i campi (title, director, release_year, genre, abstract) sono obbligatori' });
    }

    const sql = 'UPDATE movies SET title = ?, director = ?, release_year = ?, genre = ?, abstract = ?, image = ? WHERE id = ?';
    connection.query(
        sql,
        [title, director, release_year, genre, abstract, image, movieId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nell\'aggiornamento del film', details: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Film non trovato' });
            }
            res.status(200).json({ id: movieId, title, director, release_year, genre, abstract, image });
        }
    );
}
//destroy
function destroy(req, res) {
    const movieId = req.params.id;
    connection.query('DELETE FROM movies WHERE id = ?', [movieId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nell\'eliminazione del film', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }
        res.status(204).send();
    });
}

module.exports = {
    index,
    show,
    store,
    updateMovie,
    destroy
};