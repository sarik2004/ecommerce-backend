const express = require("express");
const router = express.Router();
const upload = require('../Validator/Multer')

const {
  CreateProduct,
  GetProducts,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  SearchProducts,
} = require("../Controller/Product.Controller");

router.post("/" , upload.array("img" , 10), CreateProduct);
router.get("/", GetProducts);
router.get("/search", SearchProducts);
router.get("/:id", GetProductById);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;
