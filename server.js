const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const authRouter = require("./router/auth.router")
const categoryRouter = require("./router/category_router")
const carRouter = require("./router/cars_router")

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();


app.use(cors());
app.use(express.json());

/////////////////////// ROUTER
app.use(authRouter)
app.use(categoryRouter)
app.use(carRouter)



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} the Port`);
})