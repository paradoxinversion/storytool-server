const { Story, defaultFields } = require("../models/Story");
const jwt = require("jsonwebtoken");

const createStory = async ({ token, title, synopsis }) => {
  const owner = jwt.verify(token, "dev").user;
  try {
    const newStory = new Story({
      title,
      synopsis,
      owner,
      defaultFields
    });

    newStory.updateDefaultFieldValue("title", title);
    newStory.updateDefaultFieldValue("synopsis", synopsis);
    await newStory.save();
    return newStory;
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

const getUserStories = async ({ token }) => {
  const userId = jwt.verify(token, "dev").user;
  const userStories = await Story.find({ owner: userId });
  return userStories;
};

module.exports = {
  createStory,
  readStory,
  getUserStories
};
