const { StoryPart, defaultFields } = require("../models/StoryPart");

const createStoryPart = async ({ owner, story, title, text, order }) => {
  try {
    const newStoryPart = new StoryPart({
      owner,
      story,
      order,
      storyAssetType: 0,
      defaultFields
    });

    newStoryPart.updateDefaultFieldValue("title", title);
    newStoryPart.updateDefaultFieldValue("text", text);
    await newStoryPart.save();
    return true;
  } catch (e) {
    throw e;
  }
};

const readStoryPart = async ({ storyPartId }) => {
  const storyPart = await StoryPart.findById(storyPartId);
  if (!storyPart) {
    const error = new Error(`No story part with id ${storyPartId}`);
    throw error;
  }

  return storyPart;
};

module.exports = {
  createStoryPart,
  readStoryPart
};
