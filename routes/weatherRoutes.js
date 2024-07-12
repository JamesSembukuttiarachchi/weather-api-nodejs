const express = require("express");
const { getUserWeatherData } = require("../controllers/weatherController");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

router.get("/:id", getUserWeatherData);

module.exports = router;
