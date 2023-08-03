const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path')

const logDirect = path.join(__dirname,'../logDirectory');
fs.existsSync(logDirect) || fs.mkdirSync(logDirect);

const accessLog = rfs.createStream('access.log',{
    interval :'1d',
    path: logDirect
})

const development = {
    asset_path : './assets',
    db_name : 'AuthenticatorForm',
    session_key : 'hash@6447938dmwbb9w',
    session_name : 'authenticator',
    smtp : {
        service:'gmail',
        host:'smtp.gamil.com',
        port:587,
        secure:false,
        auth:{
            user:'authapp491@gmail.com',
            pass:'bkchtajciqncyntq'
        }
    },

    
    google_clientID:"990001888719-ji0qsrkgi3a854hl4iipv4h1crsmat3n.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL:"http://localhost:5000/user/auth/google/callback",

    
    facebook_clientID:"1378543856035951",
    facebook_clientSecret:"8f739792f27bea0a597c068a67599064",
    facebook_callbackURL:"http://localhost:5000/user/auth/facebook/callback",

    morgan : {
        mode : 'dev',
        options : {stream:accessLog}
    }
}


const production = {
    asset_path : process.env.asset_path,
    db_name : process.env.db_name,
    session_key : process.env.session_key,
    session_name : process.env.session_name,
    smtp : {
        service:'gmail',
        host:'smtp.gamil.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.username,
            pass: process.env.password
        }
    },

    
    google_clientID: process.env.google_clientID,
    google_clientSecret: process.env.google_clientSecret,
    google_callbackURL: process.google_callbackURL,

    
    facebook_clientID: process.env.facebook_clientID,
    facebook_clientSecret: process.env.facebook_clientSecret,
    facebook_callbackURL: process.env.facebook_callbackURL,
    
    morgan : {
        mode : 'combined',
        options : {stream:accessLog}
    }
}

module.exports = eval(process.env.environment) == undefined ? development : eval(process.env.environment)