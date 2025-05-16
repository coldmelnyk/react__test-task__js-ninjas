const path = require('path');

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const dbPath = path.resolve(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath, err => {
  if (err) return console.error('DB connection error:', err.message);
  console.log('Connected to SQLite database');
});

app.use(express.json());

db.run(`
  CREATE TABLE IF NOT EXISTS heroes (
    id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    real_name TEXT NOT NULL,
    origin_description TEXT,
    superpowers TEXT,
    catch_phrase TEXT,
    images TEXT
  )
`);

app.get('/heroes', (req, res) => {
  db.all('SELECT * FROM heroes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const heroes = rows.map(hero => ({
      ...hero,
      images: JSON.parse(hero.images || '[]')
    }));
    res.json(heroes);
  });
});

app.get('/heroes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM heroes WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Hero not found' });

    row.images = JSON.parse(row.images || '[]');
    res.json(row);
  });
});

app.post('/heroes', (req, res) => {
  const {
    id,
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  } = req.body;

  const imagesJson = JSON.stringify(images || []);

  db.run(
    `INSERT INTO heroes (id, nickname, real_name, origin_description, superpowers, catch_phrase, images)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      imagesJson
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id,
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images
      });
    }
  );
});

app.put('/heroes/:id', (req, res) => {
  const { id } = req.params;
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  } = req.body;

  const imagesJson = JSON.stringify(images || []);

  db.run(
    `UPDATE heroes
     SET nickname = ?, real_name = ?, origin_description = ?, superpowers = ?, catch_phrase = ?, images = ?
     WHERE id = ?`,
    [
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      imagesJson,
      id
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Hero not found' });

      res.json({
        id,
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images
      });
    }
  );
});

app.delete('/heroes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM heroes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Hero not found' });

    res.json({ message: 'Hero deleted successfully' });
  });
});

app.listen(3030);
