const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { getUserNotifs } = require('../controllers/notificationController');
const Handlebars = require('handlebars')

// require authentication for all logged-in routes (middleware)
const requireAuth = require('../middleware/requireAuth')

const isLoggedIn = require('../middleware/isLoggedIn');
const { getUserReviews } = require('../controllers/reviewController');
const { getPosting } = require('../controllers/jobController');


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

router.get('/Reviews/:id', requireAuth, getUserReviews)

router.get('/Notifications', requireAuth, getUserNotifs)

router.get('/ForgotPassword', isLoggedIn, (req, res) => {
  res.render('ForgotPassword', { layout: 'ForgotPassword', })
})

router.get('/SignUp', isLoggedIn, (req, res) => {
  res.render('SignUp', { layout: 'SignUp', })
})


router.get('/job-posting', requireAuth, getPosting)

// Routes below are protected by auth middleware

router.get('/Experience', requireAuth, async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);
  res.render('Experience', { layout: 'Experience', userData: user })
})

router.get('/Main', requireAuth, async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
    const perPage = 3; // number of items per page
    const page = req.query.page || 1; // current page (default to 1)
    const query = {
      userType: 1,
      _id: { $ne: decodedToken._id },
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
    const sortOptions = { averageRating: -1 }; // Sort by averageRating field in descending order
    const users = await User.paginate(query, { page, limit: perPage, sort: sortOptions });

    // Get the current user's country
    const currentUser = await User.findById(decodedToken._id);
    const bookmarkedUsers = currentUser.user_bookmarks;
    const currentUserCountry = currentUser.country;

    if (req.query.myCountry) {
      query.country = currentUserCountry;
    }

    Handlebars.registerHelper('bookmarkedUser', function (userId) {
      const userIdString = userId.toString();
      if (bookmarkedUsers.includes(userIdString)) {
        return false;
      }
      return true;
    });

    res.render('Main', { layout: 'Main', bookmarkedUsers, users, currentUserCountry });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
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

router.get('/Hire/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.render('Hire', { layout: 'Hire', user: user })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user');
  }
})

router.get("/reset-password", isLoggedIn, async (req, res) => {
  res.render('reset-password', { layout: 'reset-password', })
})

router.get('/Bookmarks', async (req, res) => {
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  try {
    // Retrieve the user's bookmarked users from the session or database
    const currentUser = await User.findById(decodedToken._id);
    const userBookmarks = currentUser.user_bookmarks;
    // Fetch the bookmarked users' details from the database and sort by averageRating
    const bookmarkedUsers = await User.find({ _id: { $in: userBookmarks } }).sort({ averageRating: -1 });

    res.render('Bookmarks', { layout: 'Bookmarks', bookmarkedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching bookmarks');
  }
});

router.get('*', async (req, res) => {
  res.render('Error404', { layout: 'Error404' });
})

module.exports = router