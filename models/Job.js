// title
// company
// location
// salary
// description
// category

const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
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
});
module.exports = mongoose.model("Job", JobSchema);
