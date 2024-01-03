require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const server = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/api", userRoutes);
  app.use("/api", productRoutes);

  app.use(errorHandler);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

server();
