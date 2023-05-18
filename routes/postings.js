const express = require('express');
const {jobPosting, getPosting } = require('../controllers/jobController');
const verifyToken = require('../middleware/requireAuth');

const router = express.Router();

// Create a new notification for a user
router.post("/job", verifyToken, jobPosting);
router.post("/posting", verifyToken, getPosting);


module.exports = router