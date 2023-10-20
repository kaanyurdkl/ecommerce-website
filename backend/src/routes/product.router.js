const express = require("express");

const {
  httpGetAllLProducts,
  httpCreateProduct,
  httpUpdateProduct,
  httpDeleteProduct,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/", httpGetAllLProducts);
productRouter.post("/", httpCreateProduct);
productRouter.put("/:id", httpUpdateProduct);
productRouter.delete("/:id", httpDeleteProduct);

module.exports = productRouter;
