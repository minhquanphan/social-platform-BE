const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    content: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
