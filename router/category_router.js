const { Router } = require("express")
const {createCategory, getCategories} = require("../controller/categories_ctr")

const categoryRouter = Router()


categoryRouter.post("/create_category", createCategory)
categoryRouter.get("/get_categories", getCategories)


module.exports = categoryRouter