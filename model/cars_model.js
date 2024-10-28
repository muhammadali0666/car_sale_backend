const { sequelize, DataTypes } = require("../db/db_config");
const { UUIDV4 } = require("sequelize");

const Cars = sequelize.define("cars", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.TEXT,
  },
  category_id_markasi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanerovkasi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  motor: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  year: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  distance: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gearbook: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  narx: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tashqi_rasm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ichki_rasm: {
    type: DataTypes.TEXT,
  },
  discription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mini_img: {
    type: DataTypes.TEXT,
  },
});

module.exports = Cars;
