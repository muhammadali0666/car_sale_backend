const express = require("express")
const dotenv = require("dotenv")
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require("cors")
const authRouter = require("./router/auth.router")
const categoryRouter = require("./router/category_router")
const carRouter = require("./router/cars_router")
const addLike = require("./router/likes_router")

//////////////////////// swagger config

const options = {
  definition: {
   openapi:"3.0.0",
   info: {
       title: "My project",
       version: "1.0.0",
       description: 'My Project API Information'
      },
      servers: [
          {
              url: "http://localhost:4001"
          },
      ],
  },
  apis: ["./router/*.js"]
}

const swaggerDocs = swaggerJsDoc(options);
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/////////////////////////////////////////

app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 4000;


app.use(express.json());

/////////////////////// ROUTER
app.use(authRouter)
app.use(categoryRouter)
app.use(carRouter)
app.use(addLike)



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} the Port`);
})