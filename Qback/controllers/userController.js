const User = require("../models/user");

exports.userById = async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: "Failed",
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.readUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToHistory = async (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          error: "Could not update user purchase history",
        });
      }

      next();
    }
  );
};

// Adding product to vendor : INITIATED
exports.addProductToUser = (req, res, next) => {
  let products = [];
  console.log(req.body);
  next();
};
