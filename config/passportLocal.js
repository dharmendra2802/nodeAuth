const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

passport.use(new localStrat({
    usernameField: 'email',
    passReqToCallback:true
}, async function(req,email,password,done){

    try {
        // checing if user exist or not
        const user = await User.findOne({email:email});
    
        // if does not exists
        if(!user){
            req.flash('error','User does not exist. Please SignUp')
            done(null,false);
        }else{
            
            // checking password
            const isTrue = await bcrypt.compare(password,user.password);
            if(!isTrue){
                req.flash('error','Incorrect Password')
                return done(null,false);
            }

            return done(null,user);
        }
        
    } catch (err) {
        req.flash('error','Server Error '+err)
        console.log("Errro in signing in - "+err);
        return done(err);
    }

}));

// serializing and deserializing

passport.serializeUser( function(user,next)
{
    next(null,user.id,)
})

passport.deserializeUser( async function(id,next)
{
    try {
        const user = await User.findById(id);
        if(!user)
        {
            console.log("DS - user not found - "+err);
            return next(null,false);
        }
        return next(null,user);

    } catch (err) {
        console.log("DS - error - "+err);
        return next(err);
    }
})

passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
        return next();
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
        res.locals.user = req.user;
     next();
}


module.exports = passport;