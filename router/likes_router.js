const { Router } = require("express")
const { addLike, getLikes } = require("../controller/likes_ctr")
const { verifyToken } = require("../middleware/jwt.middleware")

const likeRouter = Router()


likeRouter.post("/add_like", addLike)
likeRouter.get("/get_like", verifyToken, getLikes)


module.exports = likeRouter


// update users set role = 'admin' where id = 'f0b61130-e144-4009-8fa0-0b6843c5e310';