const express = require("express"); //Express helps create backend servers and APIs easily.
const cors = require("cors"); //CORS allows frontend and backend to communicate.
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

require("dotenv").config(); //Loads secret variables from .env file.
//Secrets stay secure ✅

const app = express(); //Creates Express application.
// Middleware runs before request reaches route.

connectDB(); //connect database

//middleware
app.use(cors());
app.use(express.json()); //Converts incoming JSON data into JavaScript object.
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

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
