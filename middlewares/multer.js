const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images'); // correggi anche il path: deve essere 'public/images'
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload middleware for use in routes
module.exports = upload;