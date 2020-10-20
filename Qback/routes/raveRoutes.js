const express = require("express");
const router = express.Router();

const { initTransaction } = require("../controllers/raveController");

router.post("rave/init", initTransaction);

module.exports = router;
