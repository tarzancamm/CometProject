//! Model of the User db table

// Import DataTypes from sequelize and my database
const { db } = require("../util/database");
const { DataTypes } = require("sequelize");

// Define table and an object holding the table columns and data types
module.exports = {
  User: db.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
  }),
};
