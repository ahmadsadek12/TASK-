const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { getUserNotifs } = require('../controllers/notificationController');

// require authentication for all logged-in routes (middleware)
const requireAuth = require('../middleware/requireAuth')

const isLoggedIn = require('../middleware/isLoggedIn');
const { getUserReviews } = require('../controllers/reviewController');


// Apply requireAuth middleware to all routes except for excluded routes
router.use((req, res, next) => {
  // Array of excluded routes
  const excludedRoutes = ['/ForgotPassword', '/SignUp', '/', '/reset-password'] // Update this array with your excluded routes
  if (excludedRoutes.includes(req.path)) {
    // If the current route is in the excluded routes, skip the middleware
    return next()
  }
  requireAuth(req, res, next) // Apply the requireAuth middleware to all other routes
});


// Routes below are not protected by auth middleware
router.get('/', isLoggedIn, (req, res) => {
  res.render('SignIn', { layout: 'SignIn', })
})

router.get('/Reviews/:id', getUserReviews)

router.get('/Notifications', getUserNotifs)

router.get('/ForgotPassword', isLoggedIn, (req, res) => {
  res.render('ForgotPassword', { layout: 'ForgotPassword', })
})

router.get('/SignUp', isLoggedIn, (req, res) => {
  res.render('SignUp', { layout: 'SignUp', })
})

// Routes below are protected by auth middleware

router.get('/Experience', async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);
  res.render('Experience', { layout: 'Experience', userData: user })
})

router.get('/Main', async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const perPage = 3; // number of items per page
  const page = req.query.page || 1; // current page (default to 1)
  const query = {
    userType: 1,
    _id: { $ne: decodedToken._id }
  };
  const search = req.query.search;
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { experience: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } }
    ];
  }
  const users = await User.paginate(query, { page, limit: perPage }); // retrieve paginated users data
  res.render('Main', { layout: 'Main', users }); // pass the users data to your view
});

router.get('/search', async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const perPage = 10; // number of items per page
  const page = req.query.page || 1; // current page (default to 1)
  const query = {
    userType: 1,
    _id: { $ne: decodedToken._id }
  };
  const search = req.query.query;
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { experience: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } }
    ];
  }
  const users = await User.paginate(query, { page, limit: perPage });
  res.render('search-results', { layout: 'search-results', users });
});

router.get('/MyProfile', async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);

  res.render('MyProfile', { layout: 'MyProfile', userData: user, mainUrl: '/Main' });
})

router.get('/Profiles/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.render('Profiles', { layout: 'Profiles', user: user })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user');
  }
})

router.get("/reset-password", isLoggedIn, async (req, res) => {
  res.render('reset-password', { layout: 'reset-password', })
})



module.exports = router