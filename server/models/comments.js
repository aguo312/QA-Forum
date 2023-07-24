// comment Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: { type: String, required: true, maxlength: 140 },
  commented_by: { type: String, required: true },
  comment_date_time: { type: Date, default: () => Date.now().toString() },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for Comment's URL
CommentSchema.virtual("url").get(function () {
  return "posts/comment/" + this._id;
});

// Export Model
module.exports = mongoose.model("Comment", CommentSchema);
