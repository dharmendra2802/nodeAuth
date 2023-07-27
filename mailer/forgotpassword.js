const nodemailer = require('../config/nodemailer');

exports.linkSend = (body) =>{

    console.log(body);
    const mailOptions = {
        from: 'Node AuthAPP',
        to: body.EMAIL,
        subject: 'Verify Email',
        html: `
            <div>
                <h1>Hi</h1>
                <br>
                <h3>Follow this link to reset your password <br><strong>${body.URL}</strong></h3>
                <br>
                    <h5>Link will be valid for only <strong>5 minutes </strong>
                <br>
                <h4>Thanks</h4>
            </div>
        `
    };

    return nodemailer.sendMail(mailOptions); // Use return to propagate the Promise
};

