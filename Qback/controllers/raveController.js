require("dotenv").config();
const axios = require("axios");
const stringify = require("json-stringify-safe");

let API_KEY = process.env.RAVE_PULICKEY;
let payUrl = process.env.RAVE_API;
let secret = process.env.RAVE_SECRETKEY;

exports.initTransaction = (req, res) => {
  let payment = req.body;
  axios({
    url: payUrl,
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
    },
    data: req.body,
  })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => console.log(err));
};
