const express = require('express');
const {hireNotification, replyToNotif, createCustomNotif, deleteNotif } = require('../controllers/notificationController');
const verifyToken = require('../middleware/requireAuth');

const router = express.Router();

// Create a new notification for a user
router.post("/hire", verifyToken, hireNotification);
router.post("/respond/:notif_id", verifyToken, replyToNotif);
router.post("/create-notification", verifyToken, createCustomNotif);
router.delete("/delete-notification/:notif_id", verifyToken, deleteNotif);

module.exports = router