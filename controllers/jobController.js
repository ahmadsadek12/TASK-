const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JobPosting = require('../models/Posting');

// Create a job posting
const jobPosting = async (req, res) => {
    const { user } = req.session;
    try {
        const currentUser = await User.findById(user._id);
        const { jobDescription, hourlyWage } = req.body;
        const userId = currentUser.id; 
        const jobPosting = await JobPosting.create({
            user: userId,
            gender : currentUser.gender,
            firstName : currentUser.firstName,
            lastName : currentUser.lastName,
            jobDescription,
            hourlyWage
        });

        res.redirect('/job-posting');
    } catch (error) {
        res.status(500).json({ message: "Could not create job posting", error: error.message });
    }
};

// Get job postings
const getPosting = async (req, res) => {
    try {
        const { user } = req.session;
        const jobs = await JobPosting.find({ user: { $ne: user._id } });
        res.render('job-posting', { layout: 'job-posting', user, jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching job postings');
    }
};




module.exports = { jobPosting, getPosting }