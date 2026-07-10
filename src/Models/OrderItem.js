const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  quantity: DataTypes.INTEGER,

  price: DataTypes.FLOAT,
});

module.exports = OrderItem;