const Book = require("../models/Book")

const addBook = async (req, res) => {
  try {
    const { name, author, stock } = req.body
    const book = await new Book({
      name,
      author,
      stock,
    }).save()
    return res.status(200).send({
      success: true,
      message: "Book successfully added",
      book,
    })
  } catch (error) {
    return res.status(400).send({
      success: true,
      message: "Server Error in addBook",
      error,
    })
  }
}

const updateBook = async (req, res) => {
  try {
    const newValues = req.body
    const id = req.params.id
    const book = await Book.findOne({ _id: id })

    const updateQuery = await Book.updateMany(book, newValues)

    return res.status(200).send({
      success: true,
      message: `Book with id:${id} is updated successfully`,
      updateQuery,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in updateBook",
      error,
    })
  }
}

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id
    const query = await Book.deleteOne({ _id: id })
    return res.status(200).send({
      success: true,
      message: `Book with id:${id} is deleted successfully`,
      query,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server error in deleteBook",
      error,
    })
  }
}

const viewBook = async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).send({
      success: true,
      message: "Books fetched successfully",
      books,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server error in viewBook",
      error,
    })
  }
}

module.exports = { addBook, updateBook, deleteBook, viewBook }
