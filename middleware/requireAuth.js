const jwt = require('jsonwebtoken')
const User = require('../models/User')
const alert = require('alert')

const requireAuth = async (req, res, next) => {

    // verify authentication
    if(!req.session.token) {
        res.redirect('/');
        return res.status(401);
    }

    const token = req.session.token;

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        alert('This request is not authorized.');
        res.redirect('/');
        return res.status(401);
    }

}

module.exports = requireAuth