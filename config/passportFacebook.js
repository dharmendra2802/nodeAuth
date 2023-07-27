const passport = require('passport');
const facebookStrat = require('passport-facebook').Strategy;
const cryto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

passport.use(new facebookStrat({
    clientID:"1378543856035951",
    clientSecret:"8f739792f27bea0a597c068a67599064",
    callbackURL:"http://localhost:5000/user/auth/facebook/callback",
    profileFields: ['displayName', 'photos', 'email'],

}, async function(accessToken,refreshToken,profile,done){

    try {
        const user = await User.findOne({email:profile.email}).exec();
        // if user exists
        if(user)
            return done(null,user);
        else
        {
            console.log(profile)
            const pass = cryto.randomBytes(20).toString('hex');
            const genPass = await bcrypt.hash(pass,8);
            const newUser = await User.create({
                name:profile.displayName,
                email:profile.email || profile.id,
                // profilePicture: profile.photos
                password:genPass,
            })

            return done(null,newUser);
        }
    } catch (error) {
        console.log("Error in FaceBook Passport - "+error);
        return done(error,false);
    }

}))

module.exports = passport;