const passport = require('passport');
const facebookStrat = require('passport-facebook').Strategy;
const cryto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const env = require('./environment');

passport.use(new facebookStrat({
    clientID: env.facebook_clientID,
    clientSecret: env.facebook_clientSecret,
    callbackURL: env.facebook_callbackURL,
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
            const pass =  cryto.randomBytes(20).toString('hex');
            const genPass = await bcrypt.hash(pass,10);
            const newUser = await User.create({
                name:profile.displayName,
                email:profile.email || profile.id,
                password:genPass,
                profilePicture:'',
                localUser:false

            })

            return done(null,newUser);
        }
    } catch (error) {
        
        console.log("Error in FaceBook Passport - "+error);
        return done(error,false);
    }

}))

module.exports = passport;