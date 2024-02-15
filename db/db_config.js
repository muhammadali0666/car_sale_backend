const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(
"postgres://hdypvebt:Xt_9j5bBeWJWt2i0SO8jt7-L4owHKBCw@arjuna.db.elephantsql.com/hdypvebt"
);

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  DataTypes,
};
