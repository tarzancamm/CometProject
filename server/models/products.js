//! Model for products db table

// Import DataTypes from sequelize and my database
const { db } = require("../util/database");
const { DataTypes } = require("sequelize");

// Define table and an object holding the table columns and data types
module.exports = {
  Products: db.define("products", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT, // Allows for two decimal places
    description: DataTypes.TEXT,
  }),
};
