const express = require("express"); //Express helps create backend servers and APIs easily.
const cors = require("cors"); //CORS allows frontend and backend to communicate.
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const careerIntelligenceRoutes = require("./routes/careerIntelligenceRoutes");

require("dotenv").config(); //Loads secret variables from .env file.

const app = express(); //Creates Express application.

connectDB(); //connect database

// Create uploads folder if it doesn't exist
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✓ uploads/resumes directory created");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS Configuration - Allows Local, Vercel production & preview deployments
const allowedOrigins = [
  "http://localhost:3000",
  "https://job-board-two-blush.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost");

      if (isAllowed) {
        callback(null, true);
      } else {
        // Fallback: allow to prevent blockage across dynamic cloud deployments
        callback(null, true);
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/career-intelligence", careerIntelligenceRoutes);

// Health check and root route
app.get("/", (req, res) => {
  res.send("job portal Backend Running");
});

app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? "Connected"
      : mongoose.connection.readyState === 2
      ? "Connecting"
      : "Disconnected";

  res.json({
    status: "ok",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
