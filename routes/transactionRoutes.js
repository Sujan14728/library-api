const express = require("express")
const {
  getDetails,
  issueBook,
  returnBook,
} = require("../controllers/transactionController")
const router = express.Router()

router.get("/:id", getDetails)
router.post("/issue", issueBook)
router.post("/return", returnBook)

module.exports = router
