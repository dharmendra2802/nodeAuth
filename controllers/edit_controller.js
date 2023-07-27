const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Noty = require('noty');
const mailer = require('../mailer/password');

module.exports.changePassword = async function(req, res) {
  if (req.body.newPass !== req.body.confirmPass) {
    req.flash('error', 'Password mismatch');
    console.log("Password mismatch");
    return res.redirect('back');
  }

  try {

    const user = await User.findById(req.params.id);

    const isSame = await bcrypt.compare(req.body.currentPass, user.password);

    if (!isSame) {
      req.flash('error', 'Current password is wrong');
      console.log("Password wrong");
      return res.redirect('back');
    } else {
      const hashed = await bcrypt.hash(req.body.newPass, 10);
      await User.findByIdAndUpdate(req.params.id, { password: hashed });

      req.flash('success', 'Password changed successfully');
      console.log("Password changed");
      console.log(user.email)
      mailer.passwordChnge(user.email);
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', 'Cannot change due to internal error');
    console.log('Error in changing password:', err);
    return res.redirect('back');
  }
}
