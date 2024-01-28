const { Router } = require("express");
const { addLike, getLikes, updateLike } = require("../controller/likes_ctr");
const { verifyToken } = require("../middleware/jwt.middleware");

const likeRouter = Router();

likeRouter.post("/add_like", verifyToken, addLike);
likeRouter.get("/get_like/:id", verifyToken, getLikes);
likeRouter.post("/update_like", verifyToken, updateLike);

module.exports = likeRouter;