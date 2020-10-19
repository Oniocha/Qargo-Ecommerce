const express = require("express");
const router = express.Router();

const { generateToken } = require("../controllers/qargoController");

router.get("rave/getToken", generateToken);

module.exports = router;
