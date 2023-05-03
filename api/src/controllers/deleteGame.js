const { Videogame } = require("../db");

const deleteGame = async (req, res) => {
  try {
    const { id } = req.body;
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
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.export = deleteGame;
