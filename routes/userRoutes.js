const express = require("express");
const {
  addUser,
  updateUserLocation,
} = require("../controllers/userController");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

router.post("/", addUser);
router.put("/:id/location", updateUserLocation);

module.exports = router;
