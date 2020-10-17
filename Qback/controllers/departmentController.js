const { errorHandler } = require("../helpers/dbErrorHandler");
const Department = require("../models/department");

exports.departmentById = (req, res, next, id) => {
  Department.findById(id).exec((err, department) => {
    if (err || !department) {
      return res.status(400).json({
        error: "Department does not exist",
      });
    }
    req.department = department;
    next();
  });
};

exports.createDepartment = (req, res) => {
  const department = new Department(req.body);
  department.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.readDepartment = (req, res) => {
  return res.json(req.department);
};

exports.removeDepartment = (req, res) => {
  let department = req.department;
  department.remove((err, removedDepartment) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Department removed",
    });
  });
};

exports.updateDepartment = (req, res) => {
  const department = req.department;
  department.name = req.body.name;
  department.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listDepartments = (req, res) => {
  Department.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
