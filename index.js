const express = require('express');
const expresslayout = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const morgan = require('morgan');

// mongodb
const db = require('./config/mongoose');
// passport setup
const passport = require('./config/passportLocal');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportGoogle = require('./config/passportGoogle');
const passportFacebook = require('./config/passportFacebook');

// flash
const flash = require('connect-flash');
const flashMiddle = require('./config/flash');

//env 
const env = require('./config/environment');

const path = require('path');
const PORT = 5000;


const app = express();
// setting up static file
app.use(express.static(path.join(__dirname , env.asset_path)));
// multer
app.use('/uploads' , express.static(__dirname+'/uploads'));

// setting up ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

// template setup
app.use(expresslayout);
// so all script/style will remain at same place defined in template
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// logger
app.use(morgan(env.morgan.mode,env.morgan.options))
// request conversion
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport / session setup
app.use(session({
    name: env.session_name,
    secret: env.session_key,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:100*60*100},
    store: MongoStore.create({
        mongoUrl:`mongodb://127.0.0.1:27017/${env.db_name}`,
        collection:'session',
        autoRemove:'interval',
        autoRemoveInterval: 1,
    },function(err){
        console.log('error in Session Setup');
    }),
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddle.setFlash);


// gulp
// const gulp = require('./gulp')
// setting up route
app.use('/',require('./routes/index'));
// 


app.listen(PORT,function(err)
{
    if(err)
        console.log("Error in starting server - "+err);
    
    console.log("Server Started Successfully");
})