const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const ProductImage = sequelize.define("ProductImage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProductImage;