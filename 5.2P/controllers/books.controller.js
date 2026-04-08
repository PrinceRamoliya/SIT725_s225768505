const bookService = require('../services/books.service');

exports.getAllBooks = (req, res) => {
    const items = bookService.getAllBooks();
    res.json(items);
};

exports.getBookById = (req, res) => {
    const book = bookService.getBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};