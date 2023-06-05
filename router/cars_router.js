const { Router } = require("express")
const {createCar, getCars, getCar} = require("../controller/cars.ctr")

const carRouter = Router()


carRouter.post("/create_car", createCar)
carRouter.get("/get_cars/model/:id", getCars)
carRouter.get("/get_car_info/:id", getCar)


module.exports = carRouter