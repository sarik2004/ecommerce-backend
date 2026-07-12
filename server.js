require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/Models");
const userRoutes = require("./src/Routes/User.routes");
const categoryRoutes = require("./src/Routes/Category.routes");
const productRoutes = require("./src/Routes/Product.routes");

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database connectiont.");
    console.log("Tables created successfully.");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed,", err);
  });
