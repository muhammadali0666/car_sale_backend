const { Router } = require("express")
const {createCar, getCars, getCar, getAllCars, deleteCar} = require("../controller/cars.ctr")
const {verifyToken} = require("../middleware/jwt.middleware")

const carRouter = Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     create_car:
 *       type: object
 *       required:
 *         - category_id_markasi
 *         - tanerovkasi
 *         - motor
 *         - year
 *         - color
 *         - distance
 *         - gearbook
 *         - narx
 *         - tashqi_rasm
 *         - description
 *       properties:
 *         category_id_markasi:
 *           type: string
 *           description: mashinani kategoriyasi
 *         tanerovkasi:
 *           type: string
 *           description: tanerovka
 *         motor:
 *           type: string
 *           description: motor hajmi
 *         color:
 *           type: string
 *           description: rangi
 *         distance:
 *           type: string
 *           description: qancha yurganiligi
 *         gearbook:
 *           type: string
 *           description: mashina gearbook
 *         narx:
 *           type: string
 *           description: mashina narxi
 *         tashqi_rasm:
 *           type: string
 *           description: mashina rasmin
 *         description:
 *           type: string
 *           description: mashina nomi
 *       example:
 *         category_id_markasi: mers
 *         tanerovkasi: bor
 *         motor: 1.6
 *         year: 2010
 *         color: qora
 *         distance: 100km
 *         gearbook: avtomat
 *         narx: 20000
 *         tashqi_rasm: image.png
 *         description: mersades-benz
 */

/**
 * @swagger
 * tags:
 *   name: Car
 *   description: The users managing API
 * /create_car:
 *   post:
 *     summary: create_car
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create_car'
 *     responses:
 *       200: 
 *          description: created car
 * 
 *       400: 
 *          description: error      
 */

carRouter.post("/create_car", verifyToken, createCar)

// get cars by category
/** 
* @swagger
* /get_cars/model/{id}:
*   get:
*     summary: Get the cars with category id
*     tags: [Car]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The category id
*     responses:
*       content:
*           application/json:
*             schema:
*                  $ref: '#/components/schemas/Car'
*       400:
*         description: error message
*/

carRouter.get("/get_cars/model/:id", verifyToken, getCars)

// get one car with car_id
/** 
* @swagger
* /get_car_info/{id}:
*   get:
*     summary: Get the car by id
*     tags: [Car]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The car id
*     responses:
*       content:
*           application/json:
*             schema:
*                  $ref: '#/components/schemas/Car'
*       400:
*         description: error message
*/

carRouter.get("/get_car_info/:id", verifyToken, getCar)

carRouter.get("/get_all_car",verifyToken, getAllCars)
carRouter.delete("/delete_car/:id",verifyToken, deleteCar)


module.exports = carRouter