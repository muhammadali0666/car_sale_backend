const { Categories } = require("../model")

Categories.sync({ force: false })

const createCategory = async (req, res) => {
  try {
    const { category_title, category_img } = req.body

    if(!category_title) {
      return res.status(200).send({
        msg: "Title not found"
      })
    }
    if(!category_img) {
      return res.status(200).send({
        msg: "Img not found"
      })
    }

    await Categories.create({ category_img, category_title })
    return res.status(200).send({
      msg: "Cteated category"
    })
  }
  catch (err) {
    return res.send({
      msg: "error"
    })
  }
}

const getCategories = async (_, res) => {
  try {
    let categories = await Categories.findAll();
    res.json(categories)
  }
  catch (err) {
    return res.send({
      msg: "error"
    })
  }
}

module.exports = {
  createCategory,
  getCategories
}