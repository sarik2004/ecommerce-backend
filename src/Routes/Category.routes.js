const express = require("express");
const router = express.Router();

const {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategory,
  DeleteCategory,
} = require("../Controller/Category.Controller");

router.post("/", CreateCategory);
router.get("/", GetCategories);
router.get("/:id", GetCategoryById);
router.put("/:id", UpdateCategory);
router.delete("/:id", DeleteCategory);

module.exports = router;
