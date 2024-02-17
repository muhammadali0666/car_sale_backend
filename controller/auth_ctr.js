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

    ///////////////////////////// nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammadalishuhratjonov50@gmail.com",
        pass: "gmlmvvatzkuedfqe",
      },
    });

    let randomStr = "";
    let randomNumberOne = Math.floor(Math.random() * 10);
    let randomNumberTwo = Math.floor(Math.random() * 10);
    let randomNumberThree = Math.floor(Math.random() * 10);
    let randomNumberFour = Math.floor(Math.random() * 10);

    randomStr += randomNumberOne;
    randomStr += randomNumberTwo;
    randomStr += randomNumberThree;
    randomStr += randomNumberFour;

    let mailOptions = {
      from: "muhammadalishuhratjonov50@gmail.com",
      to: `${email}`,
      subject: "car sale verify code",
      html: `<b> your verification code is ${randomStr}</b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    /////////////////////////////

    if (!password.trim().match(/[A-Za-z0-9]+$/g)) {
      return res.status(400).send({
        msg: "Password invalid",
      });
    }

    let hash = await bcrypt.hash(password, 12);

    await Users.create({ username, email, password: hash, verify: randomStr });

    return res.status(201).send({
      msg: "Registered!",
      email,
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { verify, email } = req.body;

    const user = await Users.findOne({ where: { email: email } });

    if(!user.email){
      return res.send({
        message: "user not found"
      })
    }
    if(user.verify !== verify){
      return res.send({
        msg: "verify code mistake"
      });
    }

    if(user.verify === verify) {
      let token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.SEKRET_KEY,
        {
          expiresIn: process.env.TIME,
        }
      );
      return res.send({
        msg: "Success",
        token,
      });
    }
    
  } catch (err) {
    return res.send({
      message: err.message,
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
      verifyAdmin ? verifyAdmin : !verifyAdmin;
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

module.exports = {
  authRegister,
  authLogin,
  authAdminLogin,
  verifyCode,
};
