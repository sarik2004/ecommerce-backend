const express = require("express");
const router = express.Router();

const {
  CreateUser,
  ListUser,
  UserLogin,
  UpdateUser,
  DeleteUser,
} = require("../Controller/User.Controller");
const { Validator } = require("../Validator/authValidator");

router.post("/register", Validator, CreateUser);
router.get("/list", ListUser);
router.put("/update/:id", UpdateUser);
router.delete("/delete/:id", DeleteUser);
router.post("/login", UserLogin);

module.exports = router;
