const Book = require('../models/Book');

const WRITE_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];

class HttpError extends Error {
    constructor(status, message, details = []) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const formatValidationError = (error) => {
    if (error instanceof HttpError) {
        return error;
    }

    if (error && error.code === 11000) {
        return new HttpError(409, 'A book with that id already exists.', ['Duplicate id.']);
    }

    if (error && error.name === 'ValidationError') {
        const details = Object.values(error.errors).map((item) => item.message);
        return new HttpError(400, 'Validation failed.', details);
    }

    if (error && error.name === 'CastError') {
        return new HttpError(400, 'Validation failed.', [`${error.path} has an invalid value.`]);
    }

    if (error && error.name === 'StrictModeError') {
        return new HttpError(400, 'Validation failed.', [error.message]);
    }

    return error;
};

const sanitiseWritePayload = (payload, { allowId }) => {
    if (!isPlainObject(payload)) {
        throw new HttpError(400, 'Request body must be a JSON object.', ['Request body must be a JSON object.']);
    }

    if (!allowId && Object.prototype.hasOwnProperty.call(payload, 'id')) {
        throw new HttpError(400, 'Validation failed.', ['id is immutable and cannot be changed.']);
    }

    const allowedFields = allowId ? WRITE_FIELDS : WRITE_FIELDS.filter((field) => field !== 'id');
    const unknownFields = Object.keys(payload).filter((field) => !allowedFields.includes(field));

    if (unknownFields.length > 0) {
        throw new HttpError(400, 'Validation failed.', [`Unexpected field(s): ${unknownFields.join(', ')}.`]);
    }

    const cleanPayload = {};
    allowedFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(payload, field)) {
            cleanPayload[field] = payload[field];
        }
    });

    if (!allowId && Object.keys(cleanPayload).length === 0) {
        throw new HttpError(400, 'Validation failed.', ['At least one updatable field is required.']);
    }

    return cleanPayload;
};

const getAllBooks = async () => {
    return Book.find({}).sort({ id: 1 });
};

const getBookById = async (id) => {
    return Book.findOne({ id });
};

const createBook = async (payload) => {
    try {
        const safePayload = sanitiseWritePayload(payload, { allowId: true });
        return await Book.create(safePayload);
    } catch (error) {
        throw formatValidationError(error);
    }
};

const updateBook = async (id, payload) => {
    try {
        const safePayload = sanitiseWritePayload(payload, { allowId: false });
        const book = await Book.findOne({ id });

        if (!book) {
            return null;
        }

        book.set(safePayload);
        await book.validate();
        await book.save();
        return book;
    } catch (error) {
        throw formatValidationError(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};
