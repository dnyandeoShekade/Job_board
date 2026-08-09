const express = require("express"); //Express helps create backend servers and APIs easily.
const cors = require("cors"); //CORS allows frontend and backend to communicate.
const cookieParser = require("cookie-parser"); // Parse cookies from requests
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config(); //Loads secret variables from .env file.
//Secrets stay secure ✅

const app = express(); //Creates Express application.
// Middleware runs before request reaches route.

connectDB(); //connect database

// Create uploads folder if it doesn't exist
const fs = require("fs");
const path = require("path");

// Create uploads directory structure
const uploadsDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✓ uploads/resumes directory created");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from uploads folder

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
  }),
); //✅ Enables frontend requests with credentials
app.use(express.json()); //Converts incoming JSON data into JavaScript object.
app.use(cookieParser()); // Parse cookies from incoming requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);

// test route
// Incoming request data.
// Used to send response back.
app.get("/", (req, res) => {
  res.send("job portal Backend Running");
  //   Sends response to browser.

  // This creates API endpoint.
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// This file is basically the "heart" of your backend server.
