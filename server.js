const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Portal Backend Running",
    endpoints: {
      auth: "/api/auth",
      jobs: "/api/jobs",
      applications: "/api/applications",
      dashboard: "/api/dashboard",
    },
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
});

// Connect to database (async)
connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
