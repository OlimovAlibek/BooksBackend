const express = require("express")
const router = express.Router()
const BookController = require("../controllers/controllerBook")

router.get(
    "/books",
    BookController.getBooks
)

router.post(
    "/books",
    BookController.createBook
)


router.get(
    "/books/:id",
    BookController.getBookById
)

router.put(
    "/books/:id",
    BookController.updateBook
)

router.delete(
    "/books/:id",
    BookController.deleteBook
)




module.exports = router

