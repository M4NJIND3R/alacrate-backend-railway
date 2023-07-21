var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authenticate');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.get('/', function(req, res, next) {
    res.json({message: "Hey There, thank you for using Aalacrte API (●'◡'●)"})
})

app.use('/auth', authRouter); //give user a jwt 
app.use('/api/v1', indexRouter) //needs jwt to repond



module.exports = app;
