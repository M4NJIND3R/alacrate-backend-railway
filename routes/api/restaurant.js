var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});


router.get('/:retaurantId', (req, res, next) => {
  //restaurant page if we add one
  res.json('respond with a resource');
});

module.exports = router;
