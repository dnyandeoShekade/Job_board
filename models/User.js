const mongoose = require("mongoose");

// user data structre
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // This is the field name stored in MongoDB.
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"], //enum means only these values are allowed.
    default: "user",
    // Mongoose will throw a validation error.
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ]
});
module.exports = mongoose.model("user", userSchema);

// {
//   "name": "Dnyandeo",
//   "email": "test@gmail.com",
//   "password": "123456",
//   "role": "user"
//  }
