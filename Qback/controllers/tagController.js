const { errorHandler } = require("../helpers/dbErrorHandler");
const Tag = require("../models/tag");

exports.tagById = async (req, res, next, id) => {
  await Tag.findById(id).exec((err, tag) => {
    if (err || !tag) {
      return res.status(400).json({
        status: "Failed",
        error: "Tag does not exist",
      });
    }
    req.tag = tag;
    next();
  });
};

exports.createTag = async (req, res) => {
  const tag = new Tag(req.body);
  await tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        error: err.errors.name.message,
      });
    }
    res.json({ data });
  });
};

exports.readTag = (req, res) => {
  return res.json(req.tag);
};

exports.removeTag = async (req, res) => {
  let tag = req.tag;
  await tag.remove((err, removedTag) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Tag removed",
    });
  });
};

exports.updateTag = async (req, res) => {
  const tag = req.tag;
  tag.name = req.body.name;
  await tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listTags = async (req, res) => {
  await Tag.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
