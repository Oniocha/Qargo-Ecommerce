require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.RAVE_PULICKEY,
  payUrl = process.env.RAVE_API,
  verifyUrl = process.env.RAVE_VERIFY,
  secret = process.env.RAVE_SECRETKEY;

exports.initTransaction = (req, res) => {
  let payment = req.body;
  axios({
    url: `${payUrl}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
    },
    data: payment,
  })
    .then((data) => {
      if (data.data.status === "success") {
        res.json(data.data);
      } else {
        return res.status(400).json({
          error: "Failed to generate payment",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({
        error: err,
      })
    );
};

exports.verifyTransaction = (req, res) => {
  let transactionId = req.body.transactionId;
  console.log(transactionId);
  axios({
    method: "GET",
    url: `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
  })
    .then((data) => {
      res.json(data.body);
    })
    .catch((err) => res.status(400).json({ error: err }));
};
