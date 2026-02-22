'use strict';

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage (stateful server)
let posts = [];

// POST endpoint
app.post('/postmessage', (req, res) => {
    const { topic, data } = req.body;

    // Basic validation
    if (!topic || !data) {
        return res.status(400).json({ error: 'Both topic and data are required.' });
    }

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    posts.push({
        topic,
        data,
        timestamp
    });

    res.json({ message: 'Post added successfully.' });
});

// GET endpoint to retrieve posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Serve frontend
app.use('/', express.static('pages'));

app.get('/', (req, res) => res.redirect('/posting.html'));


app.listen(8080, () => {
    console.log('Server running on port 8080');
});
