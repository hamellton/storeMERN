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

  getFilteredProducts(
    filter = {},
    sortBy = "id",
    sortOrder = "asc",
    startIndex = 0,
    perPage = 10
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let sql = "SELECT * FROM products WHERE 1=1";
        const filterValues = [];

        if (filter.priceFrom !== null) {
          sql += " AND retailPrice >= ?";
          filterValues.push(filter.priceFrom);
        }

        if (filter.priceTo !== null) {
          sql += " AND retailPrice <= ?";
          filterValues.push(filter.priceTo);
        }

        if (sortBy && sortOrder) {
          sql += ` ORDER BY ?? ${sortOrder}`;
          filterValues.push(sortBy);
        }

        sql += " LIMIT ?, ?";

        filterValues.push(startIndex, perPage);

        // Adding filtering conditions to calculate the total number of products
        let countSql = "SELECT COUNT(*) as totalCount FROM products WHERE 1=1";

        if (filter.priceFrom !== null) {
          countSql += " AND retailPrice >= ?";
        }

        if (filter.priceTo !== null) {
          countSql += " AND retailPrice <= ?";
        }

        const [results] = await this.db.query(sql, filterValues);
        const [totalResults] = await this.db.query(countSql, filterValues);

        resolve({
          products: results,
          totalProducts: totalResults[0].totalCount,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Product;
