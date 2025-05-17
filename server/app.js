import path from 'path';
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';

import {
  postNewHero,
  getHeroes,
  getHero,
  putUpdateHero,
  deleteHero
} from './controllers/heroes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const dbPath = path.resolve(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath, err => {
  if (err) return console.error('DB connection error:', err.message);
  console.log('Connected to SQLite database');
});

app.use(express.json());
app.use(cors());

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

app.get('/heroes', getHeroes(db));
app.get('/heroes/:id', getHero(db));

app.post('/heroes', postNewHero(db));

app.put('/heroes/:id', putUpdateHero(db));

app.delete('/heroes/:id', deleteHero(db));

app.listen(3030);
