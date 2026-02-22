'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 80;
const HOST = '0.0.0.0';

const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

app.use(express.json());
app.use(express.static('public'));

let posts = [];

// Load posts on startup
if (fs.existsSync(DATA_FILE)) {
    const fileData = fs.readFileSync(DATA_FILE);
    posts = JSON.parse(fileData);
}

// Save posts to file
function savePosts() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// GET all posts
app.get('/api/posts', (req, res) => {
    const sorted = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(sorted);
});

// POST new post
app.post('/api/posts', (req, res) => {
    const { topic, data } = req.body;

    if (!topic || !data) {
        return res.status(400).json({ error: "topic and data required" });
    }

    const newPost = {
        topic,
        data,
        timestamp: new Date().toISOString()
    };

    posts.push(newPost);
    savePosts();

    res.status(201).json({ message: "Post created" });
});

app.listen(PORT, HOST, () => {
    console.log("Server running on port 80");
});
