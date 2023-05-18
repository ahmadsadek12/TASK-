const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    hourlyWage: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  
  const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
  
  module.exports = JobPosting;