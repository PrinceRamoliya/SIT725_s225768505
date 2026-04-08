const mongoose = require('mongoose');
const { connectDB, MONGODB_URI } = require('./db');
const Book = require('./models/Book');

const books = [
    {
        id: 'b1',
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        year: 2008,
        genre: 'Science Fiction',
        summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another.",
        price: mongoose.Types.Decimal128.fromString('29.99')
    },
    {
        id: 'b2',
        title: 'Jane Eyre',
        author: 'Charlotte Bronte',
        year: 1847,
        genre: 'Classic',
        summary: 'An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester\'s secret and forging her own independence.',
        price: mongoose.Types.Decimal128.fromString('19.50')
    },
    {
        id: 'b3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Classic',
        summary: 'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.',
        price: mongoose.Types.Decimal128.fromString('17.95')
    },
    {
        id: 'b4',
        title: 'The English Patient',
        author: 'Michael Ondaatje',
        year: 1992,
        genre: 'Historical Fiction',
        summary: 'In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.',
        price: mongoose.Types.Decimal128.fromString('24.00')
    },
    {
        id: 'b5',
        title: 'Small Gods',
        author: 'Terry Pratchett',
        year: 1992,
        genre: 'Fantasy',
        summary: 'In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief.',
        price: mongoose.Types.Decimal128.fromString('22.40')
    }
];

const seedBooks = async () => {
    try {
        await connectDB();
        await Book.deleteMany({});
        await Book.insertMany(books);
        console.log('Database seeded with 5 books.');
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

console.log(`Using MongoDB URI: ${MONGODB_URI}`);
seedBooks();
