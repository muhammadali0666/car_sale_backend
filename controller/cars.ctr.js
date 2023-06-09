const { Cars } = require("../model")
const { Categories } = require("../model")
const jwt = require("jsonwebtoken")

Cars.sync({ force: false })

const createCar = async (req, res) => {
  try {
    const { category_id_markasi, tanerovkasi, motor, year, color, distance, gearbook, narx, tashqi_rasm, discription } = req.body
    const { token } = req.headers
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    const decodedId = decoded.id

    let foundedMarka = await Categories.findOne({ where: { category_title: category_id_markasi } })

    await Cars.create({ category_id_markasi: foundedMarka.id, user_id: decodedId, tanerovkasi, motor, year, color, distance, gearbook, narx, tashqi_rasm, discription })
    return res.status(200).send({
      msg: "Cteated car"
    })
  }
  catch (err) {
    return res.status(400).send({
      msg: err.message
    })
  }
}

const getCars = async (req, res) => {
  try {
    const { id } = req.params
    let Car = await Cars.findAll({ where: { category_id_markasi: id } });
    return res.json(Car)
  }
  catch (err) {
    return res.status(400).send({
      msg: err.message
    })
  }
}

const getCar = async (req, res) => {
  try {
    const { id } = req.params
    let Car = await Cars.findAll({ where: { id: id } });
    return res.json(Car)
  }
  catch (err) {
    return res.status(400).send({
      msg: err.message
    })
  }
}

// const getUser = async(req, res) => {
//     const { id } = req.params 

//     let user = await Users.findOne({ where: { id } });
//    return res.json(user)
// }

module.exports = {
  createCar,
  getCars,
  getCar
}