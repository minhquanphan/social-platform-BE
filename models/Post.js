const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    content: { type: String, required: true },
    images: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
