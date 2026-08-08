const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String, // File path
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Rejected", "Selected"],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", ApplicationSchema);
