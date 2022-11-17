const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    author: { type: Schema.ObjectId, required: true, ref: "Users" },
    targetType: { type: String, required: true, enum: ["Posts", "Comments"] },
    targetId: { type: Schema.ObjectId, required: true, refPath: "targetType" },
    emoj: { type: String, enum: ["like", "dislike"] },
  },
  { timestamps: true }
);

const Reaction = mongoose.model("Reactions", reactionSchema);
module.exports = Reaction;
