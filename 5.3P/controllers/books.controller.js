const bookService = require('../services/books.service');

exports.getAllBooks = async (req, res) => {
    try {
        const items = await bookService.getAllBooks();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books.' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the book.' });
    }
};
