const { errorHandler } = require("../helpers/dbErrorHandler");
const Tag = require("../models/tag");

exports.tagById = (req, res, next, id) => {
  Tag.findById(id).exec((err, tag) => {
    if (err || !tag) {
      return res.status(400).json({
        error: "Tag does not exist",
      });
    }
    req.tag = tag;
    next();
  });
};

exports.createTag = (req, res) => {
  const tag = new Tag(req.body);
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.readTag = (req, res) => {
  return res.json(req.tag);
};

exports.removeTag = (req, res) => {
  let tag = req.tag;
  tag.remove((err, removedTag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Tag removed",
    });
  });
};

exports.updateTag = (req, res) => {
  const tag = req.tag;
  tag.name = req.body.name;
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listTags = (req, res) => {
  Tag.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
