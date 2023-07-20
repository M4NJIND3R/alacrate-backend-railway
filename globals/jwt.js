
require('dotenv').config();
const jwt   = require('jsonwebtoken');


// use 'utf8' to get string instead of byte array  (512 bit key) - didnt do it but try it


// var privateKEY  = `-----BEGIN RSA PRIVATE KEY-----
// MIIEoQIBAAKCAQBi2AN9ewNfX7PI2pvcMiqd/SWOCisStH0TRKTXCdomu7qDPr6o
// fBY9vl0vNNn0lWJoq1sQdN7crisAswarsqwwqVLv1wh+9dbRnH80b67WtMpJJ0O7
// S6hUNFOlWHY5QMsX5/6SXopThi8bb4uVzxCf8MgQDOviLBiszAlxJDPtv+2UFpuI
// gDEbdse/GDjMK9VJzIVeAbTVgtToecso2ex59d9M7+1Da3ifPKesXwI+dWxYNCSR
// ZFb0ZVAD/xd6hgSQ2dYBUMjToIYVNVpLqv2fd8FTOlZ/qcnIZ5j93gd0riVYeNYR
// kfxXDu8axDkPAltQ4w18Hq1CxnzaW+gZ4Nq3AgMBAAECggEAEf6XbBGoBIXsugUq
// WMT9QzPh0WEChG49UvOtOsS9ZU3J37jdhtjIR8dPOZfakg9cEggYFP/hzrUaeQ8e
// iMWHWXiJ88Xm8w4YZKKj+czXPJk/NmAikYdthp7cF37qTvP/xUNj8guqDRihnNIK
// zGQc97EjCuD/VHaIq3Sdx2460e5j0jKos/BNaR9ebc77CvYRdTeKv4uRYZr/9aCZ
// B9+RarZJ/nC7aCdHycywBc0A5vUrZ15Ap0Sin4QmKW4n9/XhDfDHcL5ULQb1xktR
// 7YIrh8edp7B8VnkJ6qJYfXlESNLFnBqcUqXWw9ljO4Kxk7uRmQrNg9nF6MTWavOh
// C0jgKQKBgQCtuSjQYVGZQKYPm0Swdr+oqBWUSo11gO7TJEAnsRu60LvvqEpQmDyp
// Sk0ys4Pd/cqGhmIVejeMP+QKyiXMgissHdfx3agONIf+KQjuiOJYqT0r5sUoHTjA
// US0vKrUyVTm3Ooj+jjNolCytH5m/NAW1dUQEss5M2VILRMcxNfE0/QKBgQCRqDHm
// N/YGmuwFmEjW7kyaP3bfak3XaW0Hhl/9MIlnfWsDj4+USBS9wcvoLyQUT6SPbGFu
// pcUjBIWckFV/R3KTiL8hlIFAGJSvCF2YTwXRDnNI0RCy5u28KgryzvAQMPZXWqIY
// VA3OJtNt7Th8P9oNdZCEg2FgHxHjlpwd+GLWwwKBgCMbVAAoapEJ24Uz34G5vamb
// riC1oDiqwZixrrVWuT/bht87pyj6WufrOAaS+IcYDqF47sFgXXFeR/tWNqVJeOgF
// b+pU3O1h+EmIiWGLEBLSwKXqkNU2co2K2hK6ErwFNRCuJ5kpq4Hqz8x8olldbfnp
// pME+USp+kHHuiEKNoB0RAoGAThKRbIziWnf/up/9qvbgKG2MEgSw5J2lyzrDiLrT
// a51WFvqEQz6/n1aZLULXW+u0kQvOzbgdCsAJvfm/WhG54EqT6DPpc6m5SHh7coAo
// 5f2Q3Z7yDHKrSwheBffVxVf5Mqlp6RBktfMpsOpONIslHcG+TMj/EL6WoB7CX24b
// zHECgYBBAeyN8IzH38lGipXm2BMOVCI72rHM2LRScQBaEUNRwWKbNTqbvyBU0JFG
// x0PYnOOYstvkcIFKA/C/xExH4CmrU4bwp8RyDRZgjaVErlTJF8DcjLVRXuBe5QHe
// EwrgeNqzzbU6k+vxTZJhJI5deH4cRkoQ07yqbiwRus8kPZDFNA==
// -----END RSA PRIVATE KEY-----`


var publicKEY  = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBi2AN9ewNfX7PI2pvcMiqd
/SWOCisStH0TRKTXCdomu7qDPr6ofBY9vl0vNNn0lWJoq1sQdN7crisAswarsqww
qVLv1wh+9dbRnH80b67WtMpJJ0O7S6hUNFOlWHY5QMsX5/6SXopThi8bb4uVzxCf
8MgQDOviLBiszAlxJDPtv+2UFpuIgDEbdse/GDjMK9VJzIVeAbTVgtToecso2ex5
9d9M7+1Da3ifPKesXwI+dWxYNCSRZFb0ZVAD/xd6hgSQ2dYBUMjToIYVNVpLqv2f
d8FTOlZ/qcnIZ5j93gd0riVYeNYRkfxXDu8axDkPAltQ4w18Hq1CxnzaW+gZ4Nq3
AgMBAAE=
-----END PUBLIC KEY-----`


module.exports = {
 sign: (payload, $Options) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */

   payload.pubKey = publicKEY;
  // Token signing options
  var signOptions = {
    //   issuer:  $Options.issuer,
    //   subject:  $Options.subject,
    //   audience:  $Options.audience,
      expiresIn:  "10hr",    // 30 days validity
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, `${process.env.PRTIVATE_JTW_KEY}`, signOptions);
},
verify: (token, $Option) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
  var verifyOptions = {
    //   issuer:  $Option.issuer,
    //   subject:  $Option.subject,
    //   audience:  $Option.audience,
      expiresIn:  "10hr",
      algorithm:  ["RS256"]
  };
   try{
        return jwt.verify(token, `${process.env.TEMP_PUBLIC_JWT_KEY}`, verifyOptions);

   }catch (err){
        // console.log(decode.payload.exp, nowTime)
        return false;
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}