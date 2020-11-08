const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const Category = require("../models/category");

exports.categoryById = async (req, res, next, id) => {
  await Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.readCategory = (req, res) => {
  return res.json(req.category);
};

exports.removeCategory = async (req, res) => {
  let category = req.category;
  await category.remove((err, removedCategory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category removed",
    });
  });
};

exports.updateCategory = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  await category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listCategories = async (req, res) => {
  await Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
