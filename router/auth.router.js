const { Router } = require("express")
const { authRegister, authLogin, authAdminLogin } = require("../controller/auth_ctr")
// const { verifyToken } = require("../middleware/jwt.middleware")
// const { userValidate } = require("../validation/user_valiadtion")

const authRouter = Router()


// authRouter.get("/list",  getUsers)

authRouter.post("/register", authRegister)
authRouter.post("/login", authLogin)
authRouter.post("/adminLogin", authAdminLogin)

// authRouter.route("/:id")
//       .get(getUser)
//       .delete(deleteUser)
//       .put(updateUser)


module.exports = authRouter