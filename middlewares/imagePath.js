const path = require('path');

// Middleware per servire immagini dalla cartella 'public/images'
function imagePath(req, res, next) {
    // Controlla se la richiesta è per un file immagine
    if (req.path.startsWith('/images/')) {
        const imageFile = path.join(__dirname, '../public', req.path);
        res.sendFile(imageFile, (err) => {
            if (err) {
                next(); // Passa al prossimo middleware se il file non esiste
            }
        });
    } else {
        next();
    }
}

module.exports = imagePath;