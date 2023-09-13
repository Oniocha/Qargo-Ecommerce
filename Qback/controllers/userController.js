const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");

// Filtering the request body for only allowed data
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.userById = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.userId);
  if (!user) return next(new AppError("User not found", 400));

  req.profile = user;
  next();
});

exports.readUser = (req, res) => {
  return res.json(req.profile);
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password)
    return next(
      new AppError(
        "This route is not for password updates. Please use click on 'Change Password' to create a new password"
      )
    );

  // Filtering out unwanted data that we do not want users to change
  const data = filterObj(req.body, "name", "email", "username", "mobile");

  // 2) Updating user document
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.auth._id },
    data,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "User succefully updated",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.auth._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
// Updating users by admin
exports.updateUser = async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return next(
          new AppError("You are not authorized to perform this action", 400)
        );
      }
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
    { new: true, useFindAndModify: false },
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
  console.log(req.body, 'added');
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});
