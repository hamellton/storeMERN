const db = require("./../db/db");

class Product {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      // Выполните SQL-запрос к базе данных для получения всех продуктов
      const sql = "SELECT * FROM products";
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      // Выполните SQL-запрос к базе данных для получения продукта по id
      const sql = "SELECT * FROM products WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null); // Возвращаем null, если продукт не найден
          }
        }
      });
    });
  }
}

module.exports = Product;

