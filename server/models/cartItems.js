//! db model for cart items

const { db } = require("../util/database");
const { DataTypes } = require("sequelize");

module.exports = {
  CartItems: db.define("cartitems", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  }),
};
