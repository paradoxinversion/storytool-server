const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  storyParts: [{ type: Schema.Types.ObjectId, ref: "StoryPart" }],
  defaultFields: [{ name: String, value: String, fieldType: String }]
});

/**
 * Set the value of a default field in this Story
 */
StorySchema.methods.updateDefaultFieldValue = function(fieldName, value) {
  const fieldValues = this.defaultFields.map(field => {
    console.log(field);
    if (field.name === fieldName) {
      const updatedField = {
        name: field.name,
        fieldType: field.fieldType,
        value
      };
      console.log(updatedField);
      return updatedField;
    }
    return field;
  });
  this.defaultFields = fieldValues;
};

const Story = mongoose.model("Story", StorySchema);
// Set default field literals in schema files
// Bind them when new documents are created
const defaultFields = [
  { name: "title", value: "", fieldType: "text" },
  { name: "synopsis", value: "", fieldType: "textarea" }
];

module.exports = { Story, defaultFields };
