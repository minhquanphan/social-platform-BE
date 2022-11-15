const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = Schema(
  {
    from: { type: Schema.ObjectId, required: true, ref: "User" }, //Requestor
    to: { type: Schema.ObjectId, required: true, ref: "User" }, //Receiver
    status: { type: String, enum: ["pending", "accepted", "declined"] },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Friend = mongoose.model("Friends", friendSchema);
module.exports = Friend;
