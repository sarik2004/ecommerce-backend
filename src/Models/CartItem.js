const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartItem;