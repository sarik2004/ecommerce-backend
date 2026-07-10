const {DataTypes} = require('sequelize');
const sequelize = require("../Config/Connection");
const Product = sequelize.define("Product" , {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    decription : DataTypes.TEXT,
    price : {
        type: DataTypes.FLOAT,
        allowNull : false,
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue : 0,
    }
});

module.exports = Product;