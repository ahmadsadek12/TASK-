const Review = require("../models/Review")
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Notification = require('../models/Notification')



// Create a review
const createReview = async (req, res) => {


    
    try {
        const {id} = req.params;
        const { rating, review_text } = req.body;
        const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
        const user = await User.findById(decodedToken._id);
      const reviewer = {
        user_id: user.id,
        user_full_name: user.firstName + ' ' + user.lastName,
        user_gender: user.gender,
      };

      const review = await Review.create({
        created_for: id,
        creator: reviewer,
        rating,
        review: review_text
      });

      await Notification.create({
        created_for: id,
        creator: reviewer,
        type_id: 3,
        extra_data: {
          review_text: review_text
        }
      });
      res.status(201).json({ review });
    } catch (error) {
      res.status(500).json({ message: "Could not create review", error: error.message });
    }
};

// Get user reviews
const getUserReviews = async (req, res) => {
    try {

        const {id} = req.params; 
        const user = await User.findById(id);
        const reviews = await Review.find({created_for: id});

        res.render('Reviews', {layout: 'Reviews', reviews: reviews, user: user})
      } catch (error) {
        res.status(500).json({ message: "Could not get user's reviews", error: error.message });
      }
}



module.exports = { createReview, getUserReviews }