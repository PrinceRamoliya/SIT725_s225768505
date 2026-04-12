const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

// GET /api/books -> calls getAllBooks
router.get('/', booksController.getAllBooks);

// POST /api/books -> calls createBook
router.post('/', booksController.createBook);

// GET /api/books/:id -> calls getBookById
router.get('/:id', booksController.getBookById);

// PUT /api/books/:id -> calls updateBook
router.put('/:id', booksController.updateBook);

module.exports = router;
