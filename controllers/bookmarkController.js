const User = require('../models/User');

// Add a bookmarked user
const addBookmark = async (req, res) => {
    const userId = req.params.id;
    const user = req.user; // Get the authenticated user from the request
    
    try {
      // Find the user by ID and update the bookmarks array
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { bookmarks: userId } }, // Use $addToSet to add the bookmarked user ID to the bookmarks array (if it doesn't already exist)
        { new: true }
      );
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: 'Failed to add bookmark' });
    }
  };

// Remove a bookmarked user
const removeBookmark = async (req, res) => {
    const userId = req.params.id;
    const user = req.user; // Get the authenticated user from the request
    
    try {
      // Find the user by ID and update the bookmarks array
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { bookmarks: userId } }, // Use $pull to remove the bookmarked user ID from the bookmarks array
        { new: true }
      );
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: 'Failed to remove bookmark' });
    }
  };

module.exports = { addBookmark, removeBookmark };
