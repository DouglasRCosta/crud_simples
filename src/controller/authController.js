const User = require("../model/userModel");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash");
const { gerarToken } = require("../helpers/token");

module.exports = {
/** ******************
 * 
 * 
 */

  async singUp(req, res) {
    //validator-----------------------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //verificar sem vem dados no body-------------------------------

    let { firstName, lastName, email, password } = req.body;
    if (!(firstName, lastName, email, password)) {
      return res.send("negado");
    }

    //varificar se email ja esta cadastrado------------------------------
    let result = await User.findAll({ where: { email: email } });
    if (result.length > 0) {
      return res.send("email existente");
    }

    //criar hash do password-----------------------------------------
    let hashPassword = await hash.encript(password);
    let user = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      token: gerarToken(),
    };

    //salvar user--------------------------------------------------
    let save = await User.create(user);

    let token = save.token;
    const expiryDate = new Date(Date.now() + 60 * 100000000);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 100000000,
      expires: expiryDate,
    });

    // retornar se tudo dar certo----------------------------
    return res.send(token);
  },
/** ******************
 * 
 * 
 */
  async singIn(req, res) {
    let { email, password } = req.body;

    //verificar sem vem dados no body---------------------------------------------
    if (!(email, password)) {
      return res.send("precisa email e password");
    }
    //verificar se email existe--------------------------------------
    let result = await User.findOne({ where: { email: email } });

    if (!result) {
      return res.send("email e/ou senha incorretos");
    }
    // comparar senha com hash----------------------------------------------
    let verificar = await hash.compararHash(password, result.password);
    if (!verificar) {
      return res.send("email e/ou senha incorretos");
    }
    result.token = gerarToken();
    await result.save();

    // token-----------------------------------
    let token = result.token;
    const expiryDate = new Date(Date.now() + 60 * 100000000);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 100000000,
      expires: expiryDate,
    });
    return res.json(token);
  },
};
