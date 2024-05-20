const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
})

module.exports = mongoose.model("Book", bookSchema)
