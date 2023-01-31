const express = require('express')
const router = express.Router()


router.get('/', (req, res) =>{
    res.render('SignIn', {layout: 'SignIn',})
})

router.get('/ForgotPassword', (req, res) =>{
    res.render('ForgotPassword', {layout: 'ForgotPassword',})
})

router.get('/SignUp', (req, res) =>{
    res.render('SignUp', {layout: 'SignUp',})
})

router.get('/Experience', (req, res) =>{
    res.render('Experience', {layout: 'Experience',})
})

router.get('/Main', (req, res) =>{
    res.render('Main', {layout: 'Main',})
})

router.get('/MyProfile', (req, res) =>{
    res.render('MyProfile', {layout: 'MyProfile',})
})

router.get('/Notifications', (req, res) =>{
    res.render('Notifications', {layout: 'Notifications',})
})

router.get('/Profiles', (req, res) =>{
    res.render('Profiles', {layout: 'Profiles',})
})

router.get('/Reviews', (req, res) =>{
    res.render('Reviews', {layout: 'Reviews',})
})

module.exports = router