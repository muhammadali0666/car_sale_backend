const { Router } = require("express")
const {createCar, getCars} = require("../controller/cars.ctr")

const carRouter = Router()


carRouter.post("/create_car", createCar)
carRouter.get("/get_cars", getCars)


module.exports = carRouter