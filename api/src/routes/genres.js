const { Router } = require("express");

const getGenres = require("../controllers/getGenre");

const router = Router();

router.get("/", getGenres);

module.exports = router;
