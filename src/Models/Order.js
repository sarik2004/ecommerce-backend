const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  totalPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled"
    ),
    defaultValue: "Pending",
  },
});

module.exports = Order;