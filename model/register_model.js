const { sequelize, DataTypes} = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  username: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT,
    unique: true
  },
  password: {
    type: DataTypes.TEXT
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: 'user'
  },
})

module.exports = Users;