const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
require("dotenv").config()

//database config
connectDB()

//routes
app.use("/api/v1/auth", authRoutes)

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