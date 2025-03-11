const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Opprett express app
const app = express();
const port = process.env.PORT || 3000;

// Bruk CORS for å tillate frontend å få tilgang
app.use(cors());

// Sett opp SQLite database
const db = new sqlite3.Database('/mnt/data/races.db', (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite.");
});

// API for å hente alle ritt
app.get('/races', (req, res) => {
  db.all('SELECT * FROM races', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Start serveren
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
