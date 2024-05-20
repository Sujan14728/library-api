const Transaction = require("../models/Transaction")
const Book = require("../models/Book")
const User = require("../models/User")

const getDetails = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    return res.status(200).send({
      success: true,
      message: `Transaction details of id:${id} successfully fetched`,
      transaction,
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in getDetails of Transaction",
      error,
    })
  }
}
const issueBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(400).send({
        success: false,
        message: "Book not found",
      })
    }
    if (!book.availability) {
      return res.status(400).send({
        success: false,
        message: "Book is not available for issue",
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      })
    }

    await Book.updateOne(book, { stock: book.stock - 1 })

    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)

    const transaction = await new Transaction({
      user: userId,
      book: bookId,
      dueDate,
      transactionType: "borrowed",
    }).save()
    return res.status(200).send({
      success: true,
      message: "Book issued successfully",
      transaction: {
        user: user.name,
        book: book.name,
        dueDate: dueDate.toISOString(),
        transactionType: "borrowed",
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: "Server Error in issueBook",
      error,
    })
  }
}
const returnBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body

    const transaction = await Transaction.findOne({
      user: userId,
      book: bookId,
      transactionType: "borrowed",
    })
    if (!transaction) {
      return res.status(400).send({
        success: false,
        message: "Book is not borrowed by specified user",
      })
    }
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(400).send({
        success: false,
        message: "Book not found",
      })
    }

    book.availability = true
    book.stock += 1
    await book.save()

    transaction.transactionType = "returned"
    await transaction.save()

    return res.status(200).send({
      success: true,
      message: "Book return successfully",
      transaction: {
        user: userId,
        book: book.name,
        transactionType: "returned",
      },
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Server error in returnBook",
    })
  }
}

module.exports = { getDetails, issueBook, returnBook }
