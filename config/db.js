const mongoose = require("mongoose");

// Cached connection for serverless
let cachedConnection = null;

// Function to connect MongoDB
const connectDB = async () => {
  // Reuse existing connection in serverless environment
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    // Connect database using .env URL
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = connection;
    console.log("MongoDB Connected");
    
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
