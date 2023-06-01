const jwt = require("jsonwebtoken");
const { Users } = require("../model")

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    req.email = decoded;
    const admin = await Users.findOne({ where: { email: email } });
    req.isAdmin = admin.rows[0].role;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);
    req.email = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = {
  verifyAdmin,
  verifyToken
}