const User = require('../models/userModel');
const bscrypt = require('bcrypt');
const Noty = require('noty');
const multer = require('multer');
const path = require('path');
const PROFILE_PATH = path.join('/uploads/user/profile');
const nodemailer = require('../mailer/otp')


// profile

module.exports.profile =  async function(req,res)
{
    console.log(req.body);
    const user = await User.findById(req.body._id);
    return res.render('profile');
}
//signin
module.exports.signin = function(req,res)
{
    if(req.isAuthenticated())
        return res.redirect('back');
        
    return res.render('signin');
}

// creating session
module.exports.createSession = function(req,res)
{
    // console.log(req.body.id)
    req.flash('success','Logged in Successfully')
    return res.redirect('/user/profile');
}
// destroying
module.exports.destroy = function(req,res)
{
    req.flash('success','Logged out Successfully')
    req.logout(function(err){
        if(err)console.log(err);
    });
    return res.redirect('/');
}

// sigup 
module.exports.signup = function(req,res)
{
    
    if(req.isAuthenticated())
        return res.redirect('back');
    return res.render('signup');
}

// creating new user
module.exports.createUser = async function(req,res)
{
    try {
        // check if user already exists or not
        const user = await User.findOne({email:req.body.email});
        // console.log('eeeee');

        if(user){
        console.log('eeeee');
            return res.render('signin');
        }
        else
        {
                uploadProfile(req,res,async function(err)
                {
                    if(err)
                    {
                        console.log("Upload error - "+err);
                    }
                    let picture = '';

                    if(req.file)
                        picture = PROFILE_PATH + '/' + req.file.filename;

                    
                    // checink pass and confirm pass field
                    if(req.body.password !== req.body.confirmPassword)
                    {
                        console.log("password mismatch");
                        
                         return res.render('signup');    
                    } 

                    const hashPass = await bscrypt.hash(req.body.password,10);
                    req.body.password = hashPass;
                     await User.create({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                        profilePicture:picture
                    })
                    // nodemailer.generateOTP(req.body);
                    return res.render('signin');
                })
        }
            // await User.create(req.body);
            // return res.render('signin');
    }catch(err) {
        console.log("error in creating user - "+err);
        return res.render('signup');
    }
}

module.exports.sendOTP = async function(req,res)
{
    try {
            
        const OTP = generateRandomCode();

        const email = req.query.email;
        const name = req.query.name;
        
        
        const body = {email,name,OTP};
        // console.log(body)

        await nodemailer.generateOTP(body);

        console.log("otp ssend");
        req.flash('success','OTP send to your email');
        return res.status(201).json({
            message:'otp send',
            otp:OTP
        })

    } catch (err) {
        req.flash('error','Error in sending otp. Check your email')
        console.log('Error in sending otp. Check your email',err)
        return res.status(500).json({
            otp:false
        })
    }
}


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'..' , PROFILE_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + Date.now())
    }
})

uploadProfile = multer({storage: storage}).single('profilePicture');

// to generate otp
function generateRandomCode() {
    // Generate a random number between 100000 and 999999 (inclusive)
    const min = 100000;
    const max = 999999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode;
  }
  