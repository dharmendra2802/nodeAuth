const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transport = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gamil.com',
    port:587,
    secure:false,
    auth:{
        user:'authapp491@gmail.com',
        pass:'bkchtajciqncyntq'
    }
})

let renderTemp = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err)
            {
                console.log(err)
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error in sending mail:', err);
                reject(err);
            } else {
                console.log('Mail sent successfully:', info.response);
                resolve();
            }
        });
    });
};

module.exports= {
    transport : transport,
    renderTemp : renderTemp,
    sendMail:sendMail
};