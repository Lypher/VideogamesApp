const { Router } = require("express");
const getGameList = require("../controllers/getGameList");
const getGamesById = require("../controllers/getGameById");
const getGameByName = require("../controllers/getGameByName");
const postVideogame = require("../controllers/postVideogame");

const router = Router();

router.get("/", getGameByName, getGameList);

router.post("/", postVideogame);

router.get("/:id", getGamesById);

module.exports = router;
