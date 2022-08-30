const express = require("express");

const CommentController = require("../controllers/comments");

const router = express.Router();

router.get("", CommentController.getComments);

router.post("", CommentController.newComment);

router.get("/:postId", CommentController.getCommentsByPostId);

module.exports = router;
