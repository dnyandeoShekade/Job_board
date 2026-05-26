const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    // get data from frontend
    const { name, email, password } = req.body;

    // create new user
    //  Saves user into MongoDB. This creates document in database.
    const user = await User.create({
      name,
      email,
      password,
    });
    // send response Frontend receives this.
    res.status(201).json({
      success: true,
      message: "user Registered Successfully",
      user,
    });
    // Handles failures safely.
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    // get login data
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    // check user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
      // check password
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      // login success
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }
    // login success
    res.status(200).json({
      success: true,
      message: "login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = { registerUser , loginUser};
// Makes function available outside this file.
