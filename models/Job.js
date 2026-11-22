const mongoose = require("mongoose");

// Schema definition
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
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    salaryMin: {
      type: Number,
      required: true,
    },
    salaryMax: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
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

// Indexes for query optimization
JobSchema.index({ title: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ category: 1 });

module.exports = mongoose.model("Job", JobSchema);
