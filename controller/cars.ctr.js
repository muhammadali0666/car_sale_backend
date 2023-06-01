const { Cars } = require("../model")

Cars.sync({ force: false })

const createCar = async (req, res) => {
  const { markasi, tanerovkasi, motor, year, color, distance, gearbook, narx, tashqi_rasm, ichki_rasm, discription, mini_img } = req.body

    await Cars.create({ markasi, tanerovkasi, motor, year, color, distance, gearbook, narx, tashqi_rasm, ichki_rasm, discription, mini_img })
    return res.status(200).send({
      msg: "Cteated car"
    })
}

const getCars = async (_, res) => {

  let Cars = await Cars.findAll();
  res.json(Cars)
}

module.exports = {
  createCar,
  getCars
}