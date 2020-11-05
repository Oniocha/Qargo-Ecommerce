const express = require("express");
const router = express.Router();

const {
  userById,
  addOrderToHistory,
} = require("../controllers/userController");
const { createOrder, listOrders } = require("../controllers/orderController");
const { decreaseQuantity } = require("../controllers/productController");
const {
  requireSignin,
  isAuth,
  isVendor,
} = require("../controllers/authController");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToHistory,
  decreaseQuantity,
  createOrder
);

router.get("/orders/list/:userId", requireSignin, isAuth, isVendor, listOrders);

router.param("userId", userById);

module.exports = router;
