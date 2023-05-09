const express = require('express')
const router = express.Router()

// controller functions 
const { createReview } = require('../controllers/reviewController')

const requireAuth = require('../middleware/requireAuth')

// Change a user password (forgot password)
router.post('/create-review/:id', requireAuth, createReview);


module.exports = router