export class Hero {
  id;
  nickname;
  real_name;
  origin_description;
  superpowers;
  catch_phrase;
  images;

  constructor(
    id,
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  ) {
    this.id = id;
    this.nickname = nickname;
    this.real_name = real_name;
    this.origin_description = origin_description;
    this.superpowers = superpowers;
    this.catch_phrase = catch_phrase;
    this.images = images || [];
  }

  save(db, res) {
    const imagesJson = JSON.stringify(this.images);

    db.run(
      `INSERT INTO heroes (id, nickname, real_name, origin_description, superpowers, catch_phrase, images)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.id,
        this.nickname,
        this.real_name,
        this.origin_description,
        this.superpowers,
        this.catch_phrase,
        imagesJson
      ],
      err => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          id: this.id,
          nickname: this.nickname,
          real_name: this.real_name,
          origin_description: this.origin_description,
          superpowers: this.superpowers,
          catch_phrase: this.catch_phrase,
          images: this.images
        });
      }
    );
  }
}
