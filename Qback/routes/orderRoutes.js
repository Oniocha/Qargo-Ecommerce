const express = require("express");
const router = express.Router();

const {
  userById,
  addOrderToHistory,
} = require("../controllers/userController");
const {
  createOrder,
  listOrders,
  createGuestOrder,
} = require("../controllers/orderController");
const { decreaseQuantity } = require("../controllers/productController");
const {
  requireSignin,
  isAuth,
  isVendor,
} = require("../controllers/authController");

// Create order for authenticated users
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToHistory,
  decreaseQuantity,
  createOrder
);

// Create order for guest users
router.post("/order/guest/create", decreaseQuantity, createGuestOrder);

router.get("/orders/list/:userId", requireSignin, isAuth, isVendor, listOrders);

router.param("userId", userById);

module.exports = router;
