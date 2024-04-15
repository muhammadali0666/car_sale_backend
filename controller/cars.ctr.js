const { Cars } = require("../model");
const { Categories } = require("../model");
const { Likes } = require("../model");
const jwt = require("jsonwebtoken");

Cars.sync({ force: false });

const createCar = async (req, res) => {
  try {
    const {
      category_id_markasi,
      title,
      tanerovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      narx,
      tashqi_rasm,
      discription,
    } = req.body;
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    const decodedId = decoded.id;

    if (
      !category_id_markasi ||
      !title ||
      !tanerovkasi ||
      !motor ||
      !year ||
      !color ||
      !distance ||
      !gearbook ||
      !narx ||
      !tashqi_rasm ||
      !discription
    ) {
      return res.status(200).send({
        msg: "all fields require!",
      });
    }

    let foundedMarka = await Categories.findOne({
      where: { category_title: category_id_markasi },
    });

    let result = await Cars.create({
      category_id_markasi: foundedMarka.id,
      user_id: decodedId,
      title,
      tanerovkasi,
      motor,
      year,
      color,
      distance,
      gearbook,
      narx,
      tashqi_rasm,
      discription,
    });
    await Likes.create({ car_id: result.dataValues.id });
    return res.status(200).send({
      msg: "Cteated car",
    });
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const getCars = async (req, res) => {
  try {
    const { id } = req.params;
    let Car = await Cars.findAll({ where: { category_id_markasi: id } });
    return res.json(Car);
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    let Car = await Cars.findAll({ where: { id: id } });
    return res.json(Car);
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const getAllCars = async (req, res) => {
  try {
    let Car = await Cars.findAll();
    return res.json(Car);
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    await Cars.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted car!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  createCar,
  getCars,
  getCar,
  getAllCars,
  deleteCar,
};
