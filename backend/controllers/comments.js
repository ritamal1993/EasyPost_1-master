
const Comment = require("../models/comment");
const Post = require("../models/post");
const date = require('date-and-time');
const pattern = date.compile('MMM DD YYYY');
const now = new Date();

exports.newComment = ('', (req, res) => {
  var data = new Comment({
    postId: req.body.postId,
    comment: req.body.comment,
    commentUser: req.body.commentUser,
    publishDate: date.format(now, pattern),
    commentType: req.body.commentType
  });
  data.save(data, function (err, data) {
    console.log(err);
    if (err) return err;
    console.log("Comment save");
    res.send(true);
  });
});


exports.getComments = (req, res, next) => {
  const commentQuery = Comment.find().then(allComments =>
    res.status(200).json({
      message: "Comments fetched successfully!",
      comments: allComments,
    }));
};

exports.getCommentsByPostId = (req, res, next) => {
  Comment.find( {postId: req.params.postId}).then(comments => {
    if (comments) {
      res.status(200).json({comments: comments});
    } else {
      res.status(404).json({ message: "Comments not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};
