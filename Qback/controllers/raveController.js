require("dotenv").config();
const Flutterwave = require("flutterwave-node-v3");

const API_KEY = process.env.RAVE_PULICKEY,
  secret = process.env.RAVE_SECRETKEY;

const flw = new Flutterwave(API_KEY, secret);

// Get transaction fee on checkout page load, and add to the order total in the payment method checkout
exports.get_fee = async (req, res) => {
  console.log(req.body.amount);
  try {
    const payload = {
      amount: req.body.amount,
      currency: "GHS",
    };
    const response = await flw.Transaction.fee(payload);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

// Process Mobile Money Payment
exports.Gh_mobilemoney = async (req, res) => {
  console.log(req.body);
  try {
    const payload = req.body;

    const response = await flw.MobileMoney.ghana(payload);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

// Verfiy Payment
exports.verify = async (req, res) => {
  try {
    const payload = req.body; //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id

    const response = await flw.Transaction.verify(payload);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

// Fire this when a transaction fails
exports.resendWebhook = async (req, res) => {
  try {
    const payload = req.body;
    const response = await flw.Transaction.resend_hooks(payload);
    res.justify - content(response);
  } catch (error) {
    console.log(error);
  }
};
