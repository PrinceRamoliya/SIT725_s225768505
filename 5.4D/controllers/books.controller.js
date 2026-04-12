const bookService = require('../services/books.service');

const sendServiceError = (res, error, fallbackMessage) => {
    const status = error.status || 500;
    const payload = {
        message: error.message || fallbackMessage
    };

    if (Array.isArray(error.details) && error.details.length > 0) {
        payload.errors = error.details;
    }

    res.status(status).json(payload);
};

exports.getAllBooks = async (req, res) => {
    try {
        const items = await bookService.getAllBooks();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books.' });
    }
};

exports.createBook = async (req, res) => {
    try {
        const createdBook = await bookService.createBook(req.body);
        res.status(201).json(createdBook);
    } catch (error) {
        sendServiceError(res, error, 'Failed to create the book.');
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

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        sendServiceError(res, error, 'Failed to update the book.');
    }
};
