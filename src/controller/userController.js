const { validationResult } = require("express-validator");
const User = require("../model/userModel");
const hashHelper = require("../helpers/hash");
const hash = require("../helpers/hash");

module.exports = {
  /** ******************
 * 
 * 
 */
  async getUser(req, res) {
    //obter usuario de modo publico-------------------------------------
    let id = req.params.id || req.query.id || 0;
    let result = await User.findOne({ where: { id } });

    if (!result) res.send({ error: { msg: "usuario nao encontrado" } });

    return res.json({ firstName: result.firstName, lastName: result.lastName });
  },
  /** ******************
 * 
 * 
 */
  async me(req, res) {
    // obter usuario com dados pessoais------------------------------------
    let token = req.cookies.jwt;
    let result = await User.findOne({ where: { token } });
    if (!result) {
      return res.json({ erros: "usuario nao encontrado" });
    }
    return res.json({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
    });
  },
  /** ******************
 * 
 * 
 */
  async editMe(req, res) {
    // validar dados do validator------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }


    // obter token-------------------------------------------
    let token = req.cookies.jwt;
    let { firstName, lastName, email, password } = req.body;


    //encontrar user pelo token-------------------------------------
    let result = await User.findOne({ where: { token } });
    let result2 = await User.findOne({ where: { email } });


    //verificar se email ja esta cadastrado------------
    if (result2) {
      if (result2.id != result.id)
        return res.json({ erros: { email: "email já cadastrado" } });
    }


    //inserir dados novos------------------------------
    if (!result2) result.email = email;
    if (firstName) result.firstName = firstName;
    if (lastName) result.lastName = lastName;


    //criar novo hash do novo password---------------
    if (password) {
      let hash = await hashHelper.encript(password);
      result.password = hash;
    }


    //salvando alteracoes---------------------------------------
    result.save();

    return res.send("passou");
  },
/** ******************
 * 
 * 
 */
  async delete(req, res) {
    let token = req.cookies.jwt;
    let { password, email } = req.body;
    // verificando se user e encontrado pelo token----------------------
    let result = await User.findOne({ where: { token } });
    if (!result) {
      return res.json({ erros: "nao encontrado" });
    }
    

    //verificando se senha e email sao enviados-----------------------------
    if (!password || !email)
      return res.json({ erros: "email e senha precisam ser enviados" });


    // vrificando se senha hash e email batem-------------------------------
    if (
      !(await hash.compararHash(password, result.password)) ||
      !(email == result.email)
    ) {
      return res.json({ erros: "email e/ou senha estão incorretos" });
    }


    //deletando user--------------------------------------------
    await result.destroy();


    // remoçâo do token
    const expiryDate = new Date(Date.now() + 1);
    res.cookie("jwt", 0, {
      httpOnly: true,
      maxAge: 1,
      expires: expiryDate,
    });
    return res.json({ sucess: true });
  },
};
