// Question Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: { type: String, required: true, maxlength: 50 },
  summary: { type: String, required: true, maxlength: 140 },
  text: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  asked_by: { type: String, required: true },
  ask_date_time: { type: Date, default: () => Date.now().toString() },
  views: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for Question's URL
QuestionSchema.virtual("url").get(function () {
  return "posts/question/" + this._id;
});

// Export Model
module.exports = mongoose.model("Question", QuestionSchema);
