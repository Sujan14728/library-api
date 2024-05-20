const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const bookRoutes = require("./routes/bookRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
require("dotenv").config()

//database config
connectDB()

app.use(express.json())

//routes
app.use("/api/v1/auth", authRoutes)
app.use("/book", bookRoutes)
app.use("/transaction", transactionRoutes)
//rest api
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  })
})

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} on http://localhost:${process.env.PORT}`
  )
})
