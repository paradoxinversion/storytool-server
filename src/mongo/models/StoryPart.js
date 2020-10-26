const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoryPartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  story: { type: Schema.Types.ObjectId, ref: "Story" },
  order: Number,
  storyAssetType: Number,
  title: {type: String},
  text: {type: String}
});


const StoryPart = mongoose.model("StoryPart", StoryPartSchema);


module.exports = { StoryPart };
