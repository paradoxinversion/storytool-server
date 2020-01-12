const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoryPartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  story: { type: Schema.Types.ObjectId, ref: "Story" },
  order: Number,
  storyAssetType: Number,
  defaultFields: [{ name: String, value: String, fieldType: String }]
});

/**
 * Set the value of a default field in this Story
 */
StoryPartSchema.methods.updateDefaultFieldValue = function(fieldName, value) {
  const fieldValues = this.defaultFields.map(field => {
    if (field.name === fieldName) {
      const updatedField = {
        name: field.name,
        fieldType: field.fieldType,
        value
      };
      return updatedField;
    }
    return field;
  });
  this.defaultFields = fieldValues;
};

const StoryPart = mongoose.model("StoryPart", StoryPartSchema);

const defaultFields = [
  { name: "title", value: "", fieldType: "text" },
  { name: "text", value: "", fieldType: "textarea" }
];

module.exports = { StoryPart, defaultFields };
