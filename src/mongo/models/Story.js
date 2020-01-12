const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  synopsis: String,
  owner: String,
  storyParts: [String],
  defaultFields: [{ name: String, text: String, type: Number }]
});

const Story = mongoose.model("Story", StorySchema);
// Set default field literals in schema files
// Bind them when new documents are created
const defaultFields = [
  { name: "title", value: "", type: "text" },
  { name: "synopsis", value: "", type: "textarea" }
];

// const story = new Story({
//   synopsis: "A story",
//   owner: "id",
//   defaultFields: defaultFields
// })
