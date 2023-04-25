const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

const getGameList = async (req, res) => {
  try {
    let promises = [];
    for (let i = 1; i < 6; i++) {
      let apiGet = await axios(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      );
      promises.push(apiGet);
    }

    promises = (await Promise.all(promises)).map((prom) =>
      prom.data.results.map((videogame) => {
        return {
          id: videogame.id,
          name: videogame.name,
          image: videogame.background_image,
          rating: videogame.rating,
          created: false,
          genres: videogame.genres.map((genre) => {
            return {
              name: genre.name,
            };
          }),
        };
      })
    );

    let allVideogames = [];
    promises.map((games) => {
      allVideogames = allVideogames.concat(games);
    });

    let dbVideogames = await Videogame.findAll({
      attributes: ["id", "name", "image", "rating"],
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const resp = [...dbVideogames, ...allVideogames];
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getGameList;
