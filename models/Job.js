const mongoose = require("mongoose");

// Define indexes for frequently queried fields
// These indexes optimize regex searches on title, location, and category
// Applied after schema compilation for reliability
const addJobIndexes = async () => {
  try {
    // Create individual indexes for regex query optimization
    // createIndex() is idempotent - safe to call multiple times, no need to drop indexes first
    await mongoose.connection.db.collection("jobs").createIndex({ title: 1 });
    await mongoose.connection.db.collection("jobs").createIndex({ location: 1 });
    await mongoose.connection.db.collection("jobs").createIndex({ category: 1 });

    console.log("Job collection indexes created: title, location, category");
  } catch (error) {
    console.error("Error creating Job indexes:", error.message);
  }
};

// Schema definition - indexes will be applied when module loads
const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      required: false,
      enum: ["Full Time", "Part Time", "Internship", "Contract", "Remote"],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Apply indexes after schema is defined
// This runs once when the model module is loaded
addJobIndexes().catch((err) =>
  console.error("Failed to initialize Job indexes:", err)
);

module.exports = mongoose.model("Job", JobSchema);
