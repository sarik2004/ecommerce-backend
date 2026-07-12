const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");
const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

module.exports = Category;
