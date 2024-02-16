const { Users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      let verifyAdmin =
        user.role === "admin"
          ? await jwt.sign(
              { id: user.id, email: user.email },
              process.env.SEKRET_KEY,
              {
                expiresIn: process.env.TIME,
              }
            )
          : null;
      let token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.SEKRET_KEY,
        {
          expiresIn: process.env.TIME,
        }
      );
      let versus = verifyAdmin ? verifyAdmin : !verifyAdmin;
      return res.send({
        msg: "Success",
        token,
        verifyAdmin,
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

    if (!user) {
      return res.status(401).send({
        msg: "user not found",
      });
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

const sendCode = async (req, res) => {
  try {
    const {email} = req.body
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammadalishuhratjonov50@gmail.com",
        pass: "gmlmvvatzkuedfqe",
      },
    });

    let randomNumber = Math.floor(Math.random() * 10000)

    let mailOptions = {
      from: "muhammadalishuhratjonov50@gmail.com",
      to: `${email}`,
      subject: "car sale verify code",
      html: `<b> your verification code is ${randomNumber}</b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({
      msg: "Success!",
    });
  } catch (err) {
    return res.send({
      message: err.message,
    });
  }
};

module.exports = {
  authRegister,
  authLogin,
  authAdminLogin,
  sendCode
};
