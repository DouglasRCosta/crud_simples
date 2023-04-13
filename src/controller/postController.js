const { validationResult } = require("express-validator");
const generateId = require("../helpers/generateId");
const Post = require("../model/postModel");
const User = require("../model/userModel");

module.exports = {
  async get(req, res) {
    let { page, postId } = req.query;

    // obtendo um post pelo id
    if (postId) {
      let result = await Post.findOne({ where: { id: postId } });
      if (!result) {
        return res.json({ error: "id encontrado" });
      }
      return res.json(result);
    }

    // obtendo ous ultimos 10
    if (page) {
      let result = await Post.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: page * 10,
      });
      return res.json(result);
    }
    return res.json({ error: "não encontrado" });
  },
  async getMy(req, res) {
    // obtendo todos os seus posts
    let token = req.cookies.jwt;
    if (!token) {
      return res.json({ token: false });
    }
    let result = await User.findOne({ where: { token } });
    if (!result) {
      return res.json({ result: false });
    }
    let posts = await Post.findAll({ where: { user: result.id } });

    return res.json(posts);
  },
  async like(req, res) {
    // adicionando like
    let { postId } = req.query;
    let result = await Post.findByPk(postId);
    if (!postId || !result) {
      return res.json({ error: "id incorreto ou ausente" });
    }

    result.like = result.like + 1;
    result.save();
    return res.json({ sucess: true, likes: result.like });
  },
  async create(req, res) {
    //validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //obtendo titulo e conteudo
    let { title, content } = req.body;
    let token = req.cookies.jwt;
    let result = await User.findOne({ where: { token } });

    //verificando presenca de dados
    if (!result) {
      return res.json({ error: "usuario não encontrado " });
    }
    if (!title || !content) {
      return res.json({ error: "preencha os conteudos" });
    }

    //criando post
    let id = await generateId.generate(); // cria id unico
    let post = {
      id,
      title,
      content,
      like: 0,
      user: result.id,
    };

    //criando post
    let resultPost = await Post.create(post);
    if (!resultPost) {
      return res.json({ sucess: false });
    }
    return res.json({ sucess: true });
  },
  async deletePost(req, res) {
    let token = req.cookies.jwt;
    let { postId } = req.body;
    //verifica se token e postId vem
    if (!token || !postId) {
      return res.json({ deleted: false });
    }

    // verifica se existe usuario e post
    let result = await User.findOne({ where: { token } });
    if (!result) {
      return res.json({ result: false });
    }
    let result2 = await Post.findOne({ where: { id: postId } });
    if (!result2) {
      return res.json({ result2: false });
    }
    // deleta se user id estar dentro do post
    if (result2.user == result.id) {
      await result2.destroy();
    }
    return res.json({ deleted: true });
  },
};
