const { Router } = require("express")
const { authRegister, authLogin } = require("../controller/auth_ctr")
// const { userValidate } = require("../validation/user_valiadtion")

const authRouter = Router()


// authRouter.get("/list",  getUsers)

authRouter.post("/register", authRegister)
authRouter.post("/login", authLogin)

// authRouter.route("/:id")
//       .get(getUser)
//       .delete(deleteUser)
//       .put(updateUser)


module.exports = authRouter