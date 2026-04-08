const Book = require('../models/Book');

const getAllBooks = async () => {
    return Book.find({}).sort({ id: 1 });
};

const getBookById = async (id) => {
    return Book.findOne({ id });
};

module.exports = {
    getAllBooks,
    getBookById
};
