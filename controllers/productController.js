const express = require("express");
const Product = require("./../models/productsModel");

const messages = require("./../messages");
const { productNotFoundMessage } = messages.productController;

const router = express.Router();
const productModel = new Product();

router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const products = productModel.getAllProducts();
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    page,
    perPage,
    totalProducts: products.length,
    status: 200,
  });
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = productModel.getProductById(id);
  if (product) {
    res.json({ product, status: 200 });
  } else {
    res.status(404).json({ message: productNotFoundMessage, status: 404 });
  }
});

module.exports = router;
