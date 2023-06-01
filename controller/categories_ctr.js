const { Categories } = require("../model")

Categories.sync({ force: false })

const createCategory = async (req, res) => {
  const { category_title, category_img } = req.body

    await Categories.create({ category_img, category_title })
    return res.status(200).send({
      msg: "Cteated category"
    })
}

const getCategories = async (_, res) => {

  let categories = await Categories.findAll();
  res.json(categories)
}

module.exports = {
  createCategory,
  getCategories
}