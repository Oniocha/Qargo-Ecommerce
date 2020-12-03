const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

// Creating order for authenticated users
exports.createOrder = async (req, res) => {
  // console.log(req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  await order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

// Creating orders for guest users
exports.createGuestOrder = async (req, res) => {
  console.log("profile", req.profile);
  console.log("guest order", req.body);
  const order = new Order(req.body.order);
  await order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listOrders = async (req, res) => {
  await Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.webhookCheckout = (req, res) => {
  console.log(req.headers);
  const signature = req.headers["rave-signature"];

  let event;
  try {
    event = rave.webhooks.constructEvent(
      req.body,
      signature,
      process.env.RAVE_WEBHOOK_HASH
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err}`);
  }

  if (event.type === "checkout.session.complete") {
    // find the order with email and prducts same as the one from the buyer and change the status to processing. And if the payment fails, change it to 'failed'
  }
};
