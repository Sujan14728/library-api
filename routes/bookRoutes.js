const express = require("express")
const {
  addBook,
  updateBook,
  deleteBook,
  viewBook,
} = require("../controllers/bookController")
const router = express.Router()

router.post("/add", addBook)
router.put("/update/:id", updateBook)
router.delete("/delete/:id", deleteBook)
router.get("/view", viewBook)

module.exports = router
