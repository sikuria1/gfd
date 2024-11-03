const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Endpoint to get the list of images
app.get('/api/images', (req, res) => {
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter out only image files (you can customize the extensions)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
