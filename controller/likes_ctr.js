const { Likes } = require("../model")
const { Users } = require("../model")
const { Cars } = require("../model")
const jwt = require("jsonwebtoken")

Likes.sync({ force: false })

const addLike = async (req, res) => {
  try {
    const { user_id, car_id } = req.body

    await Likes.create({ user_id, car_id })
    return res.status(200).send({
      msg: "added like"
    })
  }
  catch (err) {
    return res.send({
      msg: "error"
    })
  }
}

const getLikes = async (req, res) => {
  try {
    const { token } = req.headers

    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    const decodedId = decoded.id

    let likes = await Likes.findAll({ where: { user_id: decodedId } });
    // console.log(likes[0].car_id);
    const carId = likes[0].car_id

    
    let car = await Cars.findAll({where: {id: carId}})


    return res.json(car)
  }
  catch (err) {
    return res.send({
      msg: err.message
    })
  }
}

module.exports = {
  addLike,
  getLikes
}