const { sequelize, DataTypes } = require("../db/db_config");
const { UUIDV4 } = require("sequelize");

const Categories = sequelize.define("categories", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

  category_img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Categories;
