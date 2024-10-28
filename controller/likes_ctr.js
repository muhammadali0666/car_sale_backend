const { Likes } = require("../model");
const jwt = require("jsonwebtoken");

Likes.sync({ force: false });

const addLike = async (req, res) => {
  try {
    const { car_id } = req.body;
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);

    await Likes.findOne({ where: { user_id: decoded.id } });
    await Likes.findOne({ where: { car_id: car_id } });

    await Likes.create({ car_id, user_id: decoded.id });
    return res.status(200).send({
      msg: "added like",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

const updateLike = async (req, res) => {
  const { token } = req.headers;
  try {
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    const likes = await Likes.findOne({
      where: {
        user_id: decoded.id,
        car_id: req.body.car_id,
      },
    });
    if (!likes) {
      const newLikes = await Likes.create(
        {
          user_id: decoded.id,
          car_id: req.body.car_id,
        },
        { returning: true }
      );
      res.send({
        msg: "Successfully liked",
        likes: [newLikes],
      });
    }
  } catch (error) {
    return res.send({
      msg: error.message,
    });
  }
};

const getLikes = async (req, res) => {
  try {
    const { id } = req.params;
    let likes = await Likes.findAll({ where: { car_id: id } });

    return res.json(likes);
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  addLike,
  getLikes,
  updateLike,
};
