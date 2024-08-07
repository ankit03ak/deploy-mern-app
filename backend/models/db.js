// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongo_url = process.env.MONGO_CONN;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("DB Connection Error\n", err);
        process.exit(1); // Exit process with failure
    }
};

connectToDatabase();


