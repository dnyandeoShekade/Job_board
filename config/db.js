const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    // Connect database using .env URL
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    // Show error if connection fails
    console.log("Database connection error:", error);

    // Stop server if DB not connected
    process.exit(1);
  }
};

module.exports = connectDB;
