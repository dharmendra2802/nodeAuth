const crypto = require('crypto');
const nodemailer = require('../mailer/forgotpassword');
const bcrypt = require('bcrypt');
const moment = require('moment');
const resetTokens = require('../config/token');
const User = require('../models/userModel')

module.exports.passwordResetPage = function(req,res)
{
    console.log(req.params.token);
    return res.render('forgotPassword',{token:req.query.resetToken});
}


module.exports.passwordReset =async function(req,res)
{
    console.log(req.body)
    if(req.body.newPass != req.body.confirmPass)
    {
        console.log("Pssword mismatch")
        return res.redirect('back');
    }else
    {
        console.log(req.body);
        const resetToken = req.body.token;
        const newPassword = req.body.newPass;
        const hash = await bcrypt.hash(newPassword,10);

      // Check if the reset token exists and has not expired
      const tokenData = resetTokens[resetToken];
      console.log(tokenData);
      if (!tokenData || moment().isAfter(tokenData.expires)) {
        return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }
    
      // TODO: Reset the user's password in the database using the provided newPassword
      await User.findOneAndUpdate({email:tokenData.email},{password:hash});
      
      // Mark the token as used to prevent it from being reused
      delete resetTokens[resetToken];
    
      res.status(200).json({ message: 'Password successfully reset.' });
            
    }

}

// this will send the password reset link through email
module.exports.passwordResetLink = async function(req,res)
{
    try {
        
        const EMAIL = req.params.email;
        console.log(EMAIL)
        // Check if the user exists in the database, and if so, generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const expirationTime = moment().add(5, 'minutes').valueOf(); // Expiration time 5 minutes from now
    
        // Save the reset token with the expiration time
        resetTokens[resetToken] = {
        email: EMAIL,
        expires: expirationTime
        };
        console.log(resetTokens);
    
        // Send an email to the user with the reset link containing the resetToken as a query parameter
        // The email should contain a link like: `https://yourdomain.com/reset-password?token=${resetToken}`
        const URL = `http://localhost:5000/user/password/resetpage/?resetToken=${resetToken}`;
    
        await nodemailer.linkSend({EMAIL,URL});

        res.status(200).json({ message: 'Reset link sent to your email.' });
    
    } catch (err) {
        console.log('Error in sending link',err);
        res.status(501).json({ message: err });

    }};
    
