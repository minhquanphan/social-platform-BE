const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = Schema(
  {
    from: { type: Schema.ObjectId, required: true, ref: "Users" }, //Requestor
    to: { type: Schema.ObjectId, required: true, ref: "Users" }, //Receiver
    status: { type: String, enum: ["pending", "accepted", "declined"] },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Friend = mongoose.model("Friends", friendSchema);
module.exports = Friend;
