const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Connection");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  comment: DataTypes.TEXT,
});

module.exports = Review;