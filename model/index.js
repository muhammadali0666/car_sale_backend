const Users = require("./register_model")
const Categories = require("./category_model")
const Cars = require("./cars_model")
const Likes = require("./likes_model")

Users.hasMany(Cars, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
Cars.belongsTo(Users)

module.exports = {
    Users,
    Categories,
    Cars,
    Likes
}