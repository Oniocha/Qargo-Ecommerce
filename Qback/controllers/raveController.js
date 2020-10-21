require("dotenv").config();
const axios = require("axios");

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
    data: payment,
  })
    .then((data) => {
      // res.send(response);
      // console.log(data.data.status);
      if (data.data.status === "success") {
        console.log(data);
        res.json();
      } else {
        return res.status(400).json({
          error: "Payment failed",
        });
      }
    })
    .catch((err) => console.log(err));
};
