require("dotenv").config();

class Product {
  constructor(db) {
    this.db = db;
  }

  getAllProducts() {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT * FROM products";
        const [results] = await this.db.query(sql);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }

  getProductById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT * FROM products WHERE id = ?";
        const [results] = await this.db.query(sql, [id]);

        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Product;

