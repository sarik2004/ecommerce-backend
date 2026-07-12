const {DataTypes} = require('sequelize');
const sequelize = require("../Config/Connection");
const User = sequelize.define("User" , {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone : DataTypes.STRING,
    
    role:{
        type: DataTypes.ENUM("customer" , "admin"),
        defaultValue: "customer",
    },
});

module.exports = User;