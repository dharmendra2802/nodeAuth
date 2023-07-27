const nodemailer = require('../config/nodemailer');

exports.generateOTP = (body) =>{

    const mailOptions = {
        from: 'Node AuthAPP',
        to: body.email,
        subject: 'Verify Email',
        html: `
            <div>
                <h1>Hi ${body.name}</h1>
                <br>
                <h3>The code to verify your Email is - <strong>${body.OTP}</strong></h3>
                <br><br>
                <h4>Thanks</h4>
            </div>
        `
    };

    return nodemailer.sendMail(mailOptions); // Use return to propagate the Promise
};

