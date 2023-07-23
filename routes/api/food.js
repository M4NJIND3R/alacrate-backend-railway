var express = require('express');
var {check, validationResult} = require('express-validator');

var router = express.Router();

const db = require('../../globals/DB')
var earthRadius = "6371000" //earth radius in meters

//# using Express validator to validate incoming data in "uri query" format ?a=xxxx&b=xxxx
//# always need to request radius and location, rest is optional
router.get('/food',[
  check('category').optional().isString().trim().escape(),
  check('priceBar').optional().isDecimal().trim(),
  check('radius').not().isEmpty().isDecimal(),
  check('lat').not().isEmpty().isDecimal(),
  check('lng').not().isEmpty().isDecimal(),
  check('sort').optional().isString().trim(),
  

] ,async function(req, res, next) {

    //collect errors from validation
    const errors = validationResult(req);

    //if no errors
    if(errors.isEmpty()){

      //formatting string to create sql statement 
      var categoryFormated = req.query.category? "= '"+req.query.category+"'":"is not null"
      var priceBarFormated = req.query.priceBar? "<= "+req.query.priceBar:"is not null"
      var user_location = {lat: req.query.lat, lng: req.query.lng}
      var radius = req.query.radius < 200? 200:req.query.radius
      var sort = req.query.sort? req.query.sort:"price"

      //this will be determined by coordinates using google maps api, this will help minimize the number of calculations.or we can do select restaurant inner join food_item
      var userCity = 'totonto' 

      //get top 20 food items, under selected category and price, and sort them in decending order by price or other selected value
      // optemize seacrh by first selecting items in given city, then compare lat longs and distance, do not need to cal for all the values
      // var sqlRequestQuery = `
      // SELECT TOP 20
      //   fi.name as food_name,
      //   res.name as res_name, 
      //   price, 
      //   item_img, 
      //   item_description, 
      //   menu_category, 
      //   res.lat, 
      //   res.lng, 
      //   RES.city,
      //   (${earthRadius} * acos(cos(radians(${user_location.lat})) * cos(radians(res.lat)) * cos(radians(res.lng) - radians(${user_location.lng})) + sin(radians(${user_location.lat})) * sin(radians(res.lat)))) AS distance 
      // FROM Food_item fi 
      // INNER JOIN Restaurant as res 
      // ON fi.restaurant_id = res.id 
      // WHERE 
      //   -- city = '${userCity}' AND this line will be commented. do we need this ?
      //   (6371000 * acos(cos(radians(${user_location.lat})) * cos(radians(res.lat)) * cos(radians(res.lng) - radians(${user_location.lng})) + sin(radians(${user_location.lat})) * sin(radians(res.lat)))) <= ${radius} AND
      //   menu_category ${categoryFormated} AND 
      //   price ${priceBarFormated} 
      // ORDER BY ${sort}
      // `

      user_location.lat = 43.65524289575089; 
      user_location.lng = -79.3835844710046;
      radius = 50;

      var sqlRequestQuery = `
      SELECT TOP 20
        fi.name as food_name,
        res.name as res_name, 
        price, 
        item_img, 
        item_description, 
        menu_category, 
        res.lat, 
        res.lng, 
        RES.city,
        (${earthRadius} * acos(cos(radians(${user_location.lat})) * cos(radians(res.lat)) * cos(radians(res.lng) - radians(${user_location.lng})) + sin(radians(${user_location.lat})) * sin(radians(res.lat)))) AS distance 
      FROM Food_item fi 
      INNER JOIN Restaurant as res 
      ON fi.restaurant_id = res.id 
      WHERE 
        -- city = '${userCity}' AND this line will be commented. do we need this ?
        (6371000 * acos(cos(radians(${user_location.lat})) * cos(radians(res.lat)) * cos(radians(res.lng) - radians(${user_location.lng})) + sin(radians(${user_location.lat})) * sin(radians(res.lat)))) <= ${radius} AND
        menu_category ${categoryFormated} AND 
        price ${priceBarFormated} 
      ORDER BY ${sort}
      `



      //needs to be awaited for to get the data back first from server before running next line
      var result = await db.sql.request(sqlRequestQuery)
      return  res.json({d0: result.status,d1: Boolean(req.query.priceBar),d2: sqlRequestQuery , d3: result.response})
    }else{
      //if failed validation, send an array of objects called errors containing report on errors
      return res.status(422).jsonp({errors: errors.array()});
    }
  
});


router.get('/food/:foodId', (req, res, next)=>{
  //food detials age will be here
  res.json({d1: req.params.foodId, d2: 'this is id'})
});


module.exports = router;


