const User = require('../models/User')


const isLoggedIn = async(req, res, next) => {


    if(!req.session.token) {
        next();
    } else {
        return res.redirect('/Main');
    }
}


module.exports = isLoggedIn;

