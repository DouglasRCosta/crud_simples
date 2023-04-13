const jwt = require("jsonwebtoken");
module.exports={
    gerarToken(){
       return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "600h" })
    }
}