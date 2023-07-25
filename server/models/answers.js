// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  ans_by: { type: String, required: true },
  ans_date_time: { type: Date, default: () => Date.now().toString() },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for Answer's URL
AnswerSchema.virtual("url").get(function () {
  return "posts/answer/" + this._id;
});

// Export Model
module.exports = mongoose.model("Answer", AnswerSchema);
