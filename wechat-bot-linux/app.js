var home =require('./routes/home.js');
var wxbot =require('./routes/wxbot.js');
var warning = require('./routes/warning.js');
var path=require('path')					
var express=require('express');				
var session = require("express-session");	
var app=new express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*5
    },
    rolling:true
}))
app.set('view engine','ejs');
app.use( express.static(path.join(__dirname, './public')));
app.use('/home',home);
app.use('/wxbot',wxbot);
app.use('/warning',warning);
app.listen(3000);