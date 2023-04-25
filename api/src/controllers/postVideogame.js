const { Videogame } = require("../db");

const postVideogame = async (req, res) => {
  try {
    const { platforms, name, image, description, released, rating, genres } =
      req.body;

    const plataforma = platforms.split(",");
    console.log(req.body);

    const postGame = await Videogame.create({
      platforms: plataforma,
      name,
      image,
      description,
      released,
      rating,
    });
    await postGame.setGenres(genres);
    const dbGames = await Videogame.findAll({ where: { name: name } });
    res.status(200).json(dbGames);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = postVideogame;
