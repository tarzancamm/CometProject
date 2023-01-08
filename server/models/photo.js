const { DataTypes } = require("sequelize");
const { db } = require("../util/database");

module.exports = {
  Photo: db.define("photo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    url: DataTypes.STRING({ length: 500 }), // Increases default 255 character length
    primaryPhoto: DataTypes.BOOLEAN,
  }),
};
