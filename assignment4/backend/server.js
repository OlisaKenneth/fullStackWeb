const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'rootpassword',
  database: 'postsdb'
});

// GET posts
app.get('/api/posts', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM posts ORDER BY timestamp DESC, id DESC'
  );
  res.json(rows);
});

// POST post
app.post('/api/posts', async (req, res) => {
  const { topic, data } = req.body;

  if (!topic || !data) {
    return res.status(400).json({ error: "topic and data required" });
  }

  const [result] = await pool.query(
    'INSERT INTO posts (topic, data) VALUES (?, ?)',
    [topic, data]
  );

  const [rows] = await pool.query(
    'SELECT * FROM posts WHERE id = ?',
    [result.insertId]
  );

  res.status(201).json(rows[0]);
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
