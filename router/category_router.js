const { Router } = require("express")
const {createCategory, getCategories, deleteCategory} = require("../controller/categories_ctr")
const {verifyToken} = require("../middleware/jwt.middleware")

const categoryRouter = Router()


categoryRouter.post("/create_category", verifyToken, createCategory)
categoryRouter.get("/get_categories", verifyToken, getCategories)
categoryRouter.delete("/delete_categories/:id", verifyToken, deleteCategory)

module.exports = categoryRouter