const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  storyParts: [{ type: Schema.Types.ObjectId, ref: "StoryPart" }],
  title: {type: String, required: true},
  synopsis: {type: String}
});

const Story = mongoose.model("Story", StorySchema);

module.exports = { Story };
