const passport = require('passport');
const googleStrat = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

passport.use(new googleStrat({
    clientID:"990001888719-ji0qsrkgi3a854hl4iipv4h1crsmat3n.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:5000/user/auth/google/callback"
}, async function(accessToken,refreshToken,profile,done){

    try {
        const user = await User.findOne({email:profile.emails[0].value});

        if(user)
            return done(null,user);
        else
        {
            console.log(profile)
            const pass = crypto.randomBytes(20).toString('hex');
            const genPass = await bcrypt.hash(pass,8);
            const newUser = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:genPass,
            })
            return done(null,newUser);
        }
        
    } catch (err) {
        console.log("Error in Google Auth - "+err);
        return  done(err,false);
    }
}))

module.exports = passport;