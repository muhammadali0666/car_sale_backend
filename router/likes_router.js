const { Router } = require("express");
const { addLike, getLikes } = require("../controller/likes_ctr");
const { verifyToken } = require("../middleware/jwt.middleware");

const likeRouter = Router();

likeRouter.post("/add_like", verifyToken, addLike);
likeRouter.get("/get_like", verifyToken, getLikes);

module.exports = likeRouter;