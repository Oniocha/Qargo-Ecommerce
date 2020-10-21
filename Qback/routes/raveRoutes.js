const express = require("express");
const router = express.Router();

// const { userById } = require("../controllers/userController");
// const { requireSignin } = require("../controllers/authController");

const {
  initTransaction,
  verifyTransaction,
} = require("../controllers/raveController");

// Initiate transaction
router.post("/rave/init", initTransaction);

// Verify transaction
router.post("/rave/verify", verifyTransaction);

// router.param("userId", userById);
module.exports = router;
