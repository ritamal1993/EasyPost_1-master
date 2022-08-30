const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  comment: { type: String, required: true },
  commentUser: { type: String, required: true },
  publishDate: { type: String, required: true },
  commentType: { type: String, required: true }
});

module.exports = mongoose.model("Comment", commentSchema);

