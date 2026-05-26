const Job = require("../models/Job");

{
  /*What This Does

Receives data from frontend
 Saves job in MongoDB
 Sends response back*/
}

// Add new job

const createJob = async (req, res) => {
  try {
    // Get data from frontend
    const { title, company, location, salary, description, category } =
      req.body;

    // Creates and saves new job document.
    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      category,
    });

    // Sends JSON response to frontend
    res.status(201).json({
      success: true,
      message: "job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getALlJobs = async (req, res) => {
  try {
    //  get keyword from URL query
    const keyword = req.query.keyword || "";
    const keyword = req.query.location || "";
    const keywrod = req.query.category ||"";

    // search jobs

    const jobs = await Job.find({

      title: {
        $regex: keyword, 
        $options: "i",   //case insensitive
      },
      location:{
        $regex:location,
        $options:"i",
      },
      category:{
        $regex:keyword,
        $options:"i",
      }
    });
    // send response
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"sever error ",
      error:error.message,
    });
  }
};
const getSingleJob = async (req, res) => {
  try {
    // get job id from url
    const jobId = req.params.id;

    // find job by ID
    const job = await Job.findById(jobId);
    // check if job exists
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    // send response
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    // get job id from url
    const jobId = req.params.id;

    // update job After updating, give me updated document
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      returnDocument: "after", //Return document AFTER update.
    });
    // check if job exists
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "JOb not found",
      });
    }
    // send response
    res.status(200).json({
      success: true,
      message: "job updated successfully",
      updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
{
  /*
✅ DELETE request
✅ Removing MongoDB document
✅ findByIdAndDelete()
✅ API cleanup
*/
}
const deleteJob = async (req, res) => {
  try {
    // get job ID From URL
    const jobId = req.params.id;

    // delete job
    const deleteJOb = await Job.findByIdAndDelete(jobId);

    // check it job exists
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    // send response
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createJob, getALlJobs, getSingleJob, updateJob, deleteJob };
