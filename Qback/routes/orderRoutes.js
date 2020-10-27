const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/userController");
const { createOrder } = require("../controllers/orderController");
const { decreaseQuantity } = require("../controllers/productController");
const { requireSignin, isAuth } = require("../controllers/authController");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  decreaseQuantity,
  createOrder
);

router.param("userId", userById);

module.exports = router;
