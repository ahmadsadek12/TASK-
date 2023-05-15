const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
        created_for: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        creator: {
            type: Object,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true
        },
        fields: {
          type: String,
          required: true
      }
},
    {timestamps: true}
);

// Define a middleware function to update the average rating
reviewSchema.post('save', async function (review) {
    const User = mongoose.model('User');
  
    // Compute the average rating for the user
    const result = await Review.aggregate([
      {
        $match: {
          created_for: review.created_for,
        },
      },
      {
        $group: {
          _id: null,
          average: { $avg: '$rating' },
        },
      },
    ]);
  
    // Update the user's average rating
    if (result.length > 0) {
      const averageRating = result[0].average;
      await User.updateOne(
        { _id: review.created_for },
        { $set: { averageRating: averageRating } }
      );
    }
  });
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
