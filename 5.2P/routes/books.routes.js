const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

// GET /api/books -> calls getAllBooks
router.get('/', booksController.getAllBooks);

// GET /api/books/:id -> calls getBookById
router.get('/:id', booksController.getBookById);

module.exports = router;