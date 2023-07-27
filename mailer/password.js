const nodemailer = require('../config/nodemailer');

exports.passwordChnge = (body) =>{
    // console.log(otp);
    let htmlString = nodemailer.renderTemp({body:body},'/password.ejs')
    nodemailer.transport.sendMail({
        from:'Node AuthAPP',
        to: body.email,
        subject:'Password changed',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail "+err)
            return;
        }
        console.log("Password SEND "+info)
        return
    })
}