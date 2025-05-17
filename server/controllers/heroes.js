import { Hero } from '../models/Hero.js';

export const postNewHero = db => {
  return (req, res) => {
    const {
      id,
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images
    } = req.body;

    const newHero = new Hero(
      id,
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images
    );

    newHero.save(db, res);
  };
};

export const getHeroes = db => {
  return (req, res) => {
    db.all('SELECT * FROM heroes', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const heroes = rows.map(hero => ({
        ...hero,
        images: JSON.parse(hero.images || '[]')
      }));
      res.json(heroes);
    });
  };
};

export const getHero = db => {
  return (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM heroes WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Hero not found' });

      row.images = JSON.parse(row.images || '[]');
      res.json(row);
    });
  };
};

export const putUpdateHero = db => {
  return (req, res) => {
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
  };
};

export const deleteHero = db => {
  return (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM heroes WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Hero not found' });

      res.json({ message: 'Hero deleted successfully' });
    });
  };
};
