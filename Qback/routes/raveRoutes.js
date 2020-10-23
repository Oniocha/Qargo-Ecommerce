const express = require("express");
const router = express.Router();

// const { userById } = require("../controllers/userController");
// const { requireSignin } = require("../controllers/authController");

const {
  get_fee,
  resendWebhook,
  Gh_mobilemoney,
  verify,
} = require("../controllers/raveController");

// Get transaction fees
router.post("/rave/transaction/fees", get_fee);

// Verify Payment
router.post("/rave/verify-payment", verify);

// Make momo payment
router.post("/rave/momopayment", Gh_mobilemoney);

// Resend Webhook
router.post("/rave/failed/webhook", resendWebhook);

// router.param("userId", userById);
module.exports = router;
