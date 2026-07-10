const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  province: DataTypes.STRING,

  district: DataTypes.STRING,

  commune: DataTypes.STRING,

  village: DataTypes.STRING,

  street: DataTypes.STRING,
});

module.exports = Address;