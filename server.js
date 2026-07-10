require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/Models");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
sequelize
  .sync({ alter: true })
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
