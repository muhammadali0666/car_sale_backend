const { Sequelize, DataTypes } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()
const sequelize = new Sequelize("postgres://eoxnzqat:lyr1_CQcpvqR5PkN0dcTDqOv7KCsMqIc@heffalump.db.elephantsql.com/eoxnzqat",{logging: false})

sequelize
      .authenticate()
      .then(() => console.log('Connected'))
      .catch((err) => console.log(err))  



module.exports = {
    sequelize,
    DataTypes
}