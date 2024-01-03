const express = require("express");
const db = require("../db/db");
const Product = require("../models/productModel");

const router = express.Router();
const productModel = new Product(db);

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder || 'asc';

    const startIndex = (page - 1) * perPage;

    const filter = {
      priceFrom: parseFloat(req.query.priceFrom) || null,
      priceTo: parseFloat(req.query.priceTo) || null,
    };

    const { products, totalProducts } = await productModel.getFilteredProducts(filter, sortBy, sortOrder, startIndex, perPage);

    res.json({
      products,
      page,
      perPage,
      totalProducts,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);

    if (product) {
      res.json({ product, status: 200 });
    } else {
      res.status(404).json({ message: "Product not found", status: 404 });
    }
  } catch (error) {
    console.error("Error when receiving product by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
