const Notification = require("../models/Notification")
const jwt = require('jsonwebtoken')
const User = require('../models/User')
// GET USER NOTIFICATIONS
const getUserNotifs = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
    const userId = decodedToken._id;

    const notifications = await Notification.find({
      $or: [{ created_for: userId }]
    }).sort({ createdAt: -1 });
    res.render('Notifications', { layout: 'Notifications', notifs: notifications })
  } catch (error) {
    res.status(500).json({ message: "Could not get user's notifications", error: error.message });
  }
}


// Create a notification
const hireNotification = async (req, res) => {
  const { hired_id } = req.body;
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);

  try {
    const employer = {
      user_id: user.id,
      user_full_name: user.firstName + ' ' + user.lastName,
      user_gender: user.gender,
      user_phoneNumber: user.phoneNumber,
    };

    const notification = await Notification.create({
      created_for: hired_id,
      creator: employer,
      type_id: 1,
      is_pending: true,
      is_approved: false,
      is_rejected: false
    });
    res.status(201).json({ notification });
  } catch (error) {
    res.status(500).json({ message: "Could not create notification", error: error.message });
  }
};

// Create custom notification
const createCustomNotif = async (req, res) => {

  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);

  try {
    const creator = {
      user_id: user.id,
      user_full_name: user.firstName + ' ' + user.lastName,
      user_gender: user.gender,
      user_phoneNumber: user.phoneNumber,
    };
    const notification = await Notification.create({
      ...req.body,
      creator
    });
    res.status(201).json({ notification });
  } catch (error) {
    res.status(500).json({ message: "Could not create notification", error: error.message });
  }
}

// Reply to notification
const replyToNotif = async (req, res) => {
  const { notif_id } = req.params;
  const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
  const user = await User.findById(decodedToken._id);

  try {
    const updater = {
      user_id: user.id,
      user_full_name: user.firstName + ' ' + user.lastName,
      user_gender: user.gender,
      user_phoneNumber: user.phoneNumber,
    };
    const notification = await Notification.findOneAndUpdate({ _id: notif_id }, {
      ...req.body,
      creator: updater,
    }, { new: true });

    return res.status(201).json({ notification });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteNotif = async (req, res) => {
  const { notif_id } = req.params;
  try {
    const notification = await Notification.findByIdAndDelete({ _id: notif_id }, { new: true });
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete notification', error: error.message });
  }
}

module.exports = { hireNotification, getUserNotifs, createCustomNotif, replyToNotif, deleteNotif }