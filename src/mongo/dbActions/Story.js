const { Story, defaultFields } = require("../models/Story");

const createStory = async ({ owner, title, synopsis }) => {
  console.log("hey");
  console.log(Array.isArray(defaultFields));
  try {
    const newStory = new Story({
      title,
      synopsis,
      owner,
      defaultFields
    });
    // newStory.defaultFields = defaultFields;

    newStory.updateDefaultFieldValue("title", title);
    newStory.updateDefaultFieldValue("synopsis", synopsis);
    // newStory.markModified(defaultFields);
    await newStory.save();
    return true;
  } catch (e) {
    throw e;
  }
};

const readStory = async ({ storyId }) => {
  const story = await Story.findById(storyId);
  if (!story) {
    const error = new Error(`No story with id ${storyId}`);
    throw error;
  }

  return story;
};

module.exports = {
  createStory,
  readStory
};
