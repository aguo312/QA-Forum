// User Document Schema
import mongoose from "mongoose";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  time_created: { type: Date, default: () => Date.now().toString() },
});

// Virtual for User's URL
UserSchema.virtual("url").get(function () {
  return "posts/user/" + this._id;
});

// Export Model
module.exports = mongoose.model("User", UserSchema);
