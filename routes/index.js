var express = require('express');
var router = express.Router();

const foodRouter = require('./api/food')
const restaurantRouter = require('./api/restaurant')
const usersRouter = require('./api/users')

//add middleware to check jwt

router.get('/', function(req, res, next){
    res.json(['get to /food or /restaurant or /user'])
})

router.get('/food', foodRouter);

router.get('/restaurant', restaurantRouter);

router.get('/user', usersRouter);

module.exports = router;
