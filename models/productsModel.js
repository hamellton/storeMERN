const fs = require("fs");
class Product {
  loadProductsFromJSON() {
    try {
      const productsData = fs.readFileSync("db/products.json", "utf8");
      const products = JSON.parse(productsData);
      return products;
    } catch (error) {
      console.error("Error loading products from JSON file:", error);
      return [];
    }
  }

  getAllProducts() {
    const products = this.loadProductsFromJSON();
    return products;
  }
}

module.exports = Product;
