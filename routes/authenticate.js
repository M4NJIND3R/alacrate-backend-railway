var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('../globals/jwt');

/* check jwt and send to /join if no jwt */
router.get('/', function(req, res, next) {
  res.json('will authenticate users sent jwt and redirect accoridly to content or /auth/join');
});

/* NEW user GET request*/
router.get('/join', function(req, res, next) {
    res.send('Please send POST request with, username, password and email');
  });

/* NEW user POST request*/
router.post('/join', async function(req, res, next){
  console.log(req.headers)

  var password = req.headers.password;
  var username = req.headers.username;
  var email = req.headers.email;
  
  // gen a salt
  var salt = await bcrypt.genSalt(12);
  // hash password
  var hash = await bcrypt.hash(password, salt)
  // store username:hashed-pass:email
  // console.log(salt, hash, password, username, email)
  // NOTE: remove salt columns and non password hash columns

  var compare = await bcrypt.compare(password, hash);


  //gen jwt
  var payload = {username: username, email: email}

  var token = jwt.sign(payload, {})    

  setTimeout(async ()=>{console.log( jwt.verify(token,{}))},1501)   

  var okToken = jwt.verify(token,{})

  var token_decode = jwt.decode(token)
  //save data in jwt
  //send jwt

  res.json(
    {
      salt: salt,
      hash: hash, 
      pass: password, 
      username: username, 
      email: email, 
      jwt: token, 
      jwt_ok: okToken,
      jwt_decode: token_decode
    });


})

  // get jwt, check, send new if expired else send same ( could be on /auth instead of /auth/freshToken )
  router.post('/refreshToken', function(req,res,next){

    // get encryption key
    // decrupt token
    // check token
    // return token (new id exppired else same token)

  })



  router.post('/login', function(req,res,next){
    // get pass, username and device id
    // confirm pass and user in db
    // create token using device id 
  });

module.exports = router;
