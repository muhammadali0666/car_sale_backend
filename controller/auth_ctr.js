const { Users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

Users.sync({ force: false });

const authRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      return res.status(200).send({
        msg: "user already exists",
      });
    }
    if (!password.trim().match(/[A-Za-z0-9]+$/g)) {
      return res.status(400).send({
        msg: "Password invalid",
      });
    }

    let hash = await bcrypt.hash(password, 12);

    await Users.create({ username, email, password: hash });

    return res.status(201).send({
      msg: "Registered!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ where: { email: email } });

    let founEmail = user.email === email;

    if (!founEmail) {
      return res.status(404).send({
        msg: "You haven't register",
      });
    }

    let check = await bcrypt.compare(password, user.password);

    if (check) {
      let token = await jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SEKRET_KEY,
        {
          expiresIn: process.env.TIME,
        }
      );
      return res.send({
        msg: "Success",
        token,
      });
    } else {
      res.send({
        msg: "Password wrong",
      });
    }
  } catch (err) {
    res.send({
      msg: err.message,
    });
  }
};

const authAdminLogin = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await Users.findOne({ where: { email: email } });

    if(!user) {
      return res.status(401).send({
        msg: "user not found"
      })
    }

    if (user.role !== "admin") {
       res.send({
         msg: "you are not admin",
        });
      } else {
        res.send({
         msg: "Welcome to admin panel ✋",
      });
    }
  } catch {
    res.send({
      msg: "error",
    });
  }
};

// const getUsers = async(_, res) => {

//     let users = await Users.findAll();
//     res.json(users)
// }

// const getUser = async(req, res) => {
//     const { id } = req.params

//     let user = await Users.findOne({ where: { id } });
//    return res.json(user)
// }

// const deleteUser = async ( req, res ) => {
//     const { id } = req.params

//     const deletedUser = await Users.destroy({
//         returning: true,
//         plain: true,
//         where: {
//             id
//         }
//     })

//    return res.send("deleted user!")

// }

// const updateUser = async (req, res) => {
//     const { username, email, password } = req.body
//     const { id } = req.params

//     const updatedUser = await Users.update({ username, email, password }, {
//         returning: true,
//         plain: false,
//         where: {
//             id
//         }
//     })

//     return res.send(updatedUser.filter(e => e))

// }

module.exports = {
  // getUsers,
  // deleteUser,
  // updateUser,
  // getUser,
  authRegister,
  authLogin,
  authAdminLogin,
};
