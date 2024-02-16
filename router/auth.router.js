const { Router } = require("express")
const { authRegister, authLogin, authAdminLogin, verifyCode } = require("../controller/auth_ctr")

const authRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of your name
 *         email:
 *           type: string
 *           description: The user 
 *         password:
 *           type: string
 *           description: passwordinggizni kiriting
 *       example:
 *         username: Umar
 *         email: swagger_example@gmail.com
 *         password: swagger1234
 */



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The users managing API
 * /register:
 *   post:
 *     summary: Registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       201:
 *         description: Registred.
 * 
 *       200: 
 *          description: user already exists
 * 
 *       400: 
 *          description: Password invalid       
 * 
 *       500:
 *         description: Some server error
 *
 */

authRouter.post("/register", authRegister)

/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: ro'yxatdan o'tgan emailingiz
 *         password:
 *           type: string
 *           description: passwordinggizni kiriting
 *       example:
 *         email: swagger_example@gmail.com
 *         password: swagger1234
 */



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The users managing API
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       201:
 *         description: success, token
 *       404: 
 *          description: You haven't register
 *       500:
 *         description: Some server error
 *
 */

authRouter.post("/login", authLogin)
authRouter.post("/adminLogin", authAdminLogin)
authRouter.post("/verify", verifyCode)


module.exports = authRouter