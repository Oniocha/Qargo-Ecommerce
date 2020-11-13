const { errorHandler } = require("../helpers/dbErrorHandler");
const Department = require("../models/department");

exports.departmentById = async (req, res, next, id) => {
  await Department.findById(id).exec((err, department) => {
    if (err || !department) {
      return res.status(400).json({
        status: "Failed",
        error: "Department does not exist",
      });
    }
    req.department = department;
    next();
  });
};

exports.createDepartment = async (req, res) => {
  const department = new Department(req.body);
  await department.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        error: err.errors.name.message,
      });
    }
    res.json({ data });
  });
};

exports.readDepartment = (req, res) => {
  return res.json(req.department);
};

exports.removeDepartment = async (req, res) => {
  let department = req.department;
  await department.remove((err, removedDepartment) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Department removed",
    });
  });
};

exports.updateDepartment = async (req, res) => {
  const department = req.department;
  department.name = req.body.name;
  await department.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listDepartments = async (req, res) => {
  await Department.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed",
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
