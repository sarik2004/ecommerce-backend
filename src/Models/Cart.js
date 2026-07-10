const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Cart;