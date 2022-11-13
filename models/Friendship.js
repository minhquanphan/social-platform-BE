const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = Schema(
  {
    from: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    to: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    status: { type: String, enum: ["pending", "accepted", "declined"] },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Friend = mongoose.model("Friends", friendSchema);

module.exports = Friend;
