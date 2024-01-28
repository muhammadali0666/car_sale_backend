const { sequelize, DataTypes } = require("../db/db_config")
const { UUIDV4 } = require("sequelize")
const Users = require("./register_model")

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


Users.hasMany(Likes, {
  foreignKey: "user_id"
})


module.exports = Likes;