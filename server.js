const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const authRouter = require("./router/auth.router")

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();


app.use(cors());
app.use(express.json());

/////////////////////// ROUTER
app.use(authRouter)



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} the Port`);
})