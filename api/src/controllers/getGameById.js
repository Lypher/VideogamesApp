const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isNaN(id)) {
      const game = await axios(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      res.status(200).json(game.data);
    } else {
      const game = await Videogame.findByPk(id, {
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
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getGameById;
