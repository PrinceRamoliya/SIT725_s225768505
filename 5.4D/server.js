const express = require('express');
const path = require('path');
const { connectDB } = require('./db');

const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname, 'public');

app.use(express.json());

// Serve static files from the correct public folder even when Node starts elsewhere.
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Import the routes
const bookRoutes = require('./routes/books.routes');

// Mount the routes
app.use('/api/books', bookRoutes);

app.get('/api/integrity-check42', (req, res) => {
    res.status(204).send();
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
