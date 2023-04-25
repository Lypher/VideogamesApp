const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getGameDetail = (req, res) => {
  const { id } = req.params;
  axios
    .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then((response) => {
      const { id, name, description, platforms, image, Release_date, Rating } =
        response.data;
      res.status(200).json({
        id,
        name,
        description,
        platforms,
        image,
        Release_date,
        Rating,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = getGameDetail;
