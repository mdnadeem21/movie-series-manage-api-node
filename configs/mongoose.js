const mongoose = require('mongoose');

const DB_OPTIONS = {
    dbName: process.env.DB_NAME
}

const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS)
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}


module.exports = connectdb;