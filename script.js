const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config()
const bookRoutes = require("./routes/routesBooks")
const userRoutes = require("./routes/routesUsers")
const otpRoutes = require("./routes/routesOTP")


const app = express();

app.use(express.json());
connectDB();
app.use("/", bookRoutes)
app.use("/", userRoutes)
app.use("/", otpRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})