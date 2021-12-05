const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

function verifyToken(req, res, next) {

  console.log(req.cookies.sanimagi);
  // check header or url parameters or post parameters for token
  const authHeader = req.headers['authorization']
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]
  // var token =  String(req.cookies.sanimagi);

  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      // console.log(err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;