const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/userController");
const { requireSignin } = require("../controllers/authController");
const { initTransaction } = require("../controllers/raveController");

router.post("/rave/init", initTransaction);

// router.param("userId", userById);
module.exports = router;
