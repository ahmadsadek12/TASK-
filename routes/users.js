const express = require('express')
const router = express.Router()
const User = require('../models/User');

// controller functions 
const { registerUser, loginUser, logoutUser, updateUser, fetchUser, resetPassword, resetP } = require('../controllers/userController')


// middleware
const requireAuth = require('../middleware/requireAuth')
const isLoggedIn = require('../middleware/isLoggedIn')
// register route 
router.post('/register', registerUser)

// login route
router.post('/login', loginUser)

// logout route
router.get('/logout', logoutUser)

// Change a user password (forgot password)
router.post('/forgot-password', resetPassword);

// fetch a specific user
router.get('/users/:id', requireAuth, fetchUser);

router.post('/reset-password', resetP);

// Update user route
router.post('/:id/update', requireAuth, updateUser)



module.exports = router