
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

// Build the MongoDB connection URI first
const mongoUri = process.env.MONGODB_URI?.replace(
    '<DB_PASSWORD>',
    encodeURIComponent(process.env.DATABASE_PASSWORD || '')
);

// Connect to MongoDB, then start the server
mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully');

        const port = process.env.PORT || 10001;

        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Error:', err.message);
    });
