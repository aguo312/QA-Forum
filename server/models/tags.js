// Tag Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for Tag's URL
TagSchema.virtual("url").get(function () {
  return "posts/tag/" + this._id;
});

// Export Model
module.exports = mongoose.model("Tag", TagSchema);
