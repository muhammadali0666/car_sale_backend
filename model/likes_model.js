const { sequelize, DataTypes } = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Likes = sequelize.define("likes", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  car_id: {
    type: DataTypes.TEXT
  },
  user_id: {
    type: DataTypes.TEXT
  }
})

module.exports = Likes;