const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log("Database connection error", error);
    process.exit(1);
  }
};

module.exports = connectDb;
