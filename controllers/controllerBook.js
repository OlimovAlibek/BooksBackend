const Book = require("../models/Book")

exports.getBooks = async (req, res) => {
    const books = await Book.find().populate("user", "ism email yosh")
    res.json(books)
}

exports.createBook = async (req, res) => {
    const book = await Book.create(req.body)
    res.status(201).json(book)
}

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book) {
            res.status(404).json({message: "Kitob topilmadi!"})
        }

        res.status(200).json(book)

    } catch (error) {
        res.status(500).json({message: "Xato databazaga yoki serverga bog'liq!"})
    }
}

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!book) {
            res.status(404).json({message: "Bunday kitob topilmadi!"})
        }

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: "Xato databazaga yoki serverga bog'liq!"})
    }
}


exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(
      req.params.id
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


