const mongoose = require('mongoose');

const CURRENT_YEAR = new Date().getFullYear();
const ALLOWED_GENRES = [
    'Science Fiction',
    'Classic',
    'Historical Fiction',
    'Fantasy',
    'Other'
];

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^b\d+$/, 'id must start with "b" followed by digits.']
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'title must be at least 2 characters long.'],
        maxlength: [120, 'title cannot exceed 120 characters.']
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'author must be at least 2 characters long.'],
        maxlength: [80, 'author cannot exceed 80 characters.']
    },
    year: {
        type: Number,
        required: true,
        min: [1450, 'year must be 1450 or later.'],
        max: [CURRENT_YEAR, `year cannot be in the future (max ${CURRENT_YEAR}).`],
        validate: {
            validator: Number.isInteger,
            message: 'year must be an integer.'
        }
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ALLOWED_GENRES,
            message: `genre must be one of: ${ALLOWED_GENRES.join(', ')}.`
        }
    },
    summary: {
        type: String,
        required: true,
        trim: true,
        minlength: [20, 'summary must be at least 20 characters long.'],
        maxlength: [500, 'summary cannot exceed 500 characters.']
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: (value) => {
                const amount = Number(value.toString());
                return Number.isFinite(amount) && amount >= 0.5 && amount <= 500;
            },
            message: 'price must be between 0.50 and 500.00 AUD.'
        }
    }
}, {
    strict: 'throw',
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            ret.price = ret.price ? Number(ret.price.toString()) : null;
            delete ret._id;
            return ret;
        }
    }
});

module.exports = mongoose.model('Book', bookSchema);
