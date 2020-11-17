const express = require("express");
const router = express.Router();

const {
  createDepartment,
  departmentById,
  readDepartment,
  removeDepartment,
  updateDepartment,
  listDepartments,
} = require("../controllers/departmentController");
const { userById } = require("../controllers/userController");
const {
  protect,
  isAuth,
  isAdmin,
  isVendor,
} = require("../controllers/authController");

//Create department
router.post(
  "/department/create/:userId",
  protect,
  isAuth,
  isVendor,
  createDepartment
);

//View Department
router.get("/department/:departmentId", readDepartment);

//Update department
router.put(
  "/department/:departmentId/:userId",
  protect,
  isAuth,
  isVendor,
  updateDepartment
);

//Delete department
router.delete(
  "/department/:departmentId/:userId",
  protect,
  isAuth,
  isVendor,
  removeDepartment
);

//list all departments
router.get("/departments", listDepartments);

router.param("userId", userById);
router.param("departmentId", departmentById);

module.exports = router;
