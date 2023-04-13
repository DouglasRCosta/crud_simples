const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
      return res.sendStatus(401); 
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.sendStatus(401); 
      }
      next();
    });
  }

  module.exports = authenticateToken