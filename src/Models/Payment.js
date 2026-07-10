const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  method: DataTypes.STRING,

  amount: DataTypes.FLOAT,

  status: {
    type: DataTypes.ENUM("Pending", "Paid", "Failed"),
    defaultValue: "Pending",
  },
});

module.exports = Payment;