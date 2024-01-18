const { Router } = require("express")
const {createCategory, getCategories} = require("../controller/categories_ctr")
const {verifyToken} = require("../middleware/jwt.middleware")

const categoryRouter = Router()


categoryRouter.post("/create_category", verifyToken, createCategory)
categoryRouter.get("/get_categories", verifyToken, getCategories)


module.exports = categoryRouter