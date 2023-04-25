const axios = require("axios");
const { Genre } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const GetGenre = async (req, res) => {
  try {
    const db = await Genre.findAll();
    if (db.length === 0) {
      const resp = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genresMap = resp.data.results.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      });
      await Genre.bulkCreate(genresMap);
      res.status(200).json(genresMap);
    } else {
      return res.status(200).json(db);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = GetGenre;
