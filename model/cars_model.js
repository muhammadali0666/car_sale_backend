const { sequelize, DataTypes } = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Cars = sequelize.define("cars", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  category_id: {
    type: DataTypes.TEXT
  },
  markasi: {
    type: DataTypes.TEXT
  },
  tanerovkasi: {
    type: DataTypes.TEXT
  },
  motor: {
    type: DataTypes.TEXT
  },
  year: {
    type: DataTypes.TEXT
  },
  color: {
    type: DataTypes.TEXT
  },
  distance: {
    type: DataTypes.TEXT
  },
  gearbook: {
    type: DataTypes.TEXT
  },
  narx: {
    type: DataTypes.TEXT
  },
  tashqi_rasm: {
    type: DataTypes.TEXT
  },
  ichki_rasm: {
    type: DataTypes.TEXT
  },
  discription: {
    type: DataTypes.TEXT
  },
  mini_img: {
    type: DataTypes.TEXT
  }
})

module.exports = Cars;