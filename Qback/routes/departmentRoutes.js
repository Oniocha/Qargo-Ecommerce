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
const { protect, isAdmin, isVendor } = require("../controllers/authController");

//Create department
router.post("/department/create/:userId", protect, isVendor, createDepartment);

//View Department
router.get("/department/:departmentId", readDepartment);

//Update department
router.put(
  "/department/:departmentId/:userId",
  protect,
  isVendor,
  updateDepartment
);

//Delete department
router.delete(
  "/department/:departmentId/:userId",
  protect,
  isVendor,
  removeDepartment
);

//list all departments
router.get("/departments", listDepartments);

router.param("userId", userById);
router.param("departmentId", departmentById);

module.exports = router;
