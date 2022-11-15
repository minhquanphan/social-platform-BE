const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    post: { type: Schema.Types.ObjectId, required: true, ref: "Posts" },
    content: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
