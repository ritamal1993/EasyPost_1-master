const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", PostController.getAllPosts);

router.get("/page", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.get("/title/:title", PostController.getPostByTitle);

router.get("/userPosts/:id", PostController.getPostsByUser);

router.get("/userName/:userName", PostController.getPostByUserName);

router.get("/content/:content", PostController.getPostByContent);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
