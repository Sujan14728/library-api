const express = require("express")
const connectDB = require("./config/db")
require("dotenv").config()

const app = express()
connectDB()
app.use(express.json())

app.get("/", (req, res) => {
  return res.json({
    message: "hello world",
  })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port:http://localhost:${process.env.PORT}`)
})
