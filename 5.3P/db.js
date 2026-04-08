require('dotenv').config();

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sit725_5_3p';

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI);
    return mongoose.connection;
};

module.exports = {
    connectDB,
    MONGODB_URI
};
