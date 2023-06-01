const { sequelize, DataTypes } = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Categories = sequelize.define("categories", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  category_img: {
    type: DataTypes.TEXT
  },
  category_title: {
    type: DataTypes.TEXT
  }
})

module.exports = Categories;