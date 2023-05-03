const { Router } = require("express");
const getGameList = require("../controllers/getGameList");
const getGamesById = require("../controllers/getGameById");
const getGameByName = require("../controllers/getGameByName");
const postVideogame = require("../controllers/postVideogame");
const deleteGame = require("../controllers/deleteGame");

const router = Router();

router.get("/", getGameByName, getGameList);

router.post("/", postVideogame);

router.get("/:id", getGamesById);

//router.delete("/:id", deleteGame);

module.exports = router;
