const express = require("express");
const routes = express.Router();
const { db, initialize } = require("../database/mysql/db");
const authController = require("../controller/authController");
const authValidator = require("../validators/authValidator");
const userController = require("../controller/userController");
const postController = require("../controller/postController");
const userEditValidator = require("../validators/userEditValidator");
const authenticateToken = require("../middleware/authenticateToken");
const postValidator = require("../validators/postValidator");
/*
const test = async () => {
  try {
    await db.authenticate();
  } catch (error) {
    initialize();
  }
};
test();*/
routes.get("/", async (req, res) => {
  res.send("hello");
});

routes.post("/user/signin", authController.singIn);
routes.post("/user/signup", authValidator.signUp, authController.singUp);

routes.get("/user/me",authenticateToken, userController.me);
routes.put("/user/me",authenticateToken, userEditValidator.editUser, userController.editMe);
routes.delete("/user/me",authenticateToken , userController.delete);
routes.get("/user/:id", userController.getUser);


routes.get("/post", postController.get);
routes.get("/post/my", postController.getMy);
routes.post("/post",postValidator.create, postController.create);
routes.post("/post/like", postController.like);
routes.delete("/post", postController.deletePost);

module.exports = routes;
