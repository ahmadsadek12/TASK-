const User = require('../models/User')
const jwt = require('jsonwebtoken')
const alert = require('alert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')
var nodemailer = require('nodemailer');

var { email, token } = "";
// Used to create session token for user, expires in 3 days.
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        // create a token
        const token = createToken(user._id);

        req.session.token = token;
        res.redirect('/Main');
    } catch (error) {
        alert(error.message);
        return res.status(400);
    }

}

// register user
const registerUser = async (req, res) => {

    const { firstName, lastName, email, password, c_password, userType, dob, gender, otherGender, pronouns, country, phoneNumber } = req.body

    try {
        const user = await User.register(firstName, lastName, email, password, c_password, userType, dob, gender, otherGender, pronouns, country, phoneNumber)
        const token = createToken(user._id);

        req.session.token = token;

        if (userType === "1") {
            res.redirect('/Experience')
            return res.render('Experience', { layout: 'Experience', userData: user })
        }
        else {
            res.redirect('/Main')
        }
    } catch (error) {
        alert(error.message);
        return res.status(400);
    }

}

// logout user
const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to logout: ', err);
        } else {
            res.redirect('/');
        }
    })
}

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User not found.' })
    }
    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!user) {
        return res.status(400).json({ error: 'User not found.' })
    }
    const token = req.session.token;
    return res.redirect('/Main');
}

// Fetch a user
const fetchUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
}

const getUserBookmarks = async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.session.token, process.env.SECRET);
      const user = await User.findById(decodedToken._id).populate('user_bookmarks');
      res.render('Bookmarks', { layout: 'Bookmarks', users: user.user_bookmarks });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching user bookmarks');
    }
  };

// Reset password (forgot password)
const resetPassword = async (req, res) => {
    email = req.body.email;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            alert("User does not exist.")
            return
        }
        const secret = process.env.SECRET + oldUser.password;
        token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
            expiresIn: '5m'
        })
        res.redirect('/reset-password')
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'ahmadsadek8@hotmail.com',
                pass: 'elamine8' //turn it into a token
            }
        });

        var mailOptions = {
            from: 'ahmadsadek8@hotmail.com',
            to: oldUser.email,
            subject: 'Reset password token.',
            text: 'Use this token to reset your password: ' + token
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.send("error occured")
    }
}

const resetP = async (req, res) => {
    const password = req.body.password;
    const c_password = req.body.c_password;
    const token1 = req.body.token;

    if (password !== c_password) {
        alert('Passwords do not match')
        return
    }

    if (password.length < 8) {
        alert('Passwords should be 8 or more characters')
        return
    }

    if (token1 !== token) {
        alert("You entered the wrong token.")
        return
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        await User.updateOne(
            {
                email: email,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        res.redirect('/')
    } catch (error) { }
}

// Add bookmark
const addBookmark = async (req, res) => {
    const { userId } = req.params;
    const { user } = req.session;
  
    try {
      const currentUser = await User.findById(user._id);
      if (!currentUser.user_bookmarks.includes(userId)) {
        currentUser.user_bookmarks.push(userId);
        await currentUser.save();
      } else {
        return res.json({ success: true }); // Return success if the user is already bookmarked
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to add bookmark' });
    }
  };
  
 // Remove bookmark
 const deleteBookmark = async (req, res) => {
    const { userId } = req.params;
    const { user } = req.session;
  
    try {
      const currentUser = await User.findById(user._id);
      if (currentUser.user_bookmarks.includes(userId)) {
        currentUser.user_bookmarks = currentUser.user_bookmarks.filter(
          (bookmarkId) => bookmarkId !== userId
        );
        await currentUser.save();
      } else {
        return res.json({ success: true }); // Return success if the user is not bookmarked
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to remove bookmark' });
    }
  };

module.exports = { registerUser, loginUser, logoutUser, updateUser, fetchUser, resetPassword, resetP, getUserBookmarks, addBookmark, deleteBookmark };