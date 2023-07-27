const express = require('express');
const router = express.Router();
const passport = require('passport');
// controllers
const user_controller = require('../controllers/user_controller');

// redirect to other routes

// edit
router.use('/edit',require('./edit'));
// password
router.use('/password',require('./password'));
// 

// profile
router.get('/profile/',passport.checkAuthentication,user_controller.profile);

// destroy session
router.get('/destroy',user_controller.destroy);

// otp

router.get('/otp/',user_controller.sendOTP);

// signup related
router.get('/signup',user_controller.signup);
router.post('/signup/createUser',user_controller.createUser);


// signin related
router.get('/signin',user_controller.signin);
router.post('/signin/createSession',passport.authenticate(
    'local',
    {
        failureRedirect: '/user/signin'
    }
),user_controller.createSession);

// google auth
router.get('/auth/google',passport.authenticate(
    'google',
    {
        scope:['profile','email']
    }
));

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {
        failureRedirect: '/user/signin'
    }
),user_controller.createSession);
// ////// 

// facebook auth
router.get('/auth/facebook',passport.authenticate(
    'facebook',
    
));

router.get('/auth/facebook/callback',passport.authenticate(
    'facebook',
    {
        failureRedirect:'/user/signin'
    }
),user_controller.createSession);

// ///


// export
module.exports = router;