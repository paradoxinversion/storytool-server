const { StoryPart, defaultFields } = require("../models/StoryPart");
const { Story } = require("../models/Story");
const jwt = require("jsonwebtoken");

const createStoryPart = async ({ token, story, title, text }) => {
  console.log("creating part", token, story, title, text);
  const { user } = jwt.verify(token, "dev");
  const existingParts = await getStoryParts({ token, storyId: story });
  // New parts are always last for now.
  const order = existingParts.length;
  try {
    const newStoryPart = new StoryPart({
      owner: user,
      story,
      title,
      text,
      order,
      storyAssetType: 0,
      defaultFields,
    });
    await newStoryPart.save();
    return newStoryPart;
  } catch (e) {
    throw e;
  }
};

const readStoryPart = async ({ token, storyPartId }) => {
  const { user } = jwt.verify(token, "dev");
  const storyPart = await StoryPart.findById(storyPartId);
  console.log(storyPart);
  if (!storyPart) {
    const error = new Error(`No story part with id ${storyPartId}`);
    throw error;
  }
  if (storyPart.owner.toString() !== user) {
    const error = new Error("User unauthorized to access this story part");
    throw error;
  }
  return storyPart;
};

const getStoryParts = async ({ token, storyId }) => {
  const { user } = jwt.verify(token, "dev");
  const storyParts = await StoryPart.find({ story: storyId });
  console.log("Parts", storyParts);
  if (!storyParts) {
    const error = new Error(`Error finding story parts for ${storyId}`);
    throw error;
  }

  // NOTE: Mongo object ids are not strings.
  if (storyParts.length > 0 && storyParts[0].owner.toString() !== user) {
    const error = new Error("User unauthorized to access this story");
    throw error;
  }

  return storyParts;
};

const updateStoryPart = async ({ token, storyPartId, title, text }) => {
  const { user } = jwt.verify(token, "dev");
  const storyPart = await StoryPart.findById(storyPartId);
  if (!storyPart) {
    const error = new Error(`Error finding story parts for ${storyId}`);
    throw error;
  }
  if (storyPart.owner.toString() !== user) {
    const error = new Error("User unauthorized to access this story part");
    throw error;
  }

  const update = await StoryPart.findByIdAndUpdate(
    storyPartId,
    { title, text },
    { omitUndefined: true, new: true }
  );

  await update.save();
  return update;
};

const deleteStoryPart = async ({ token, storyPartId }) => {
  const { user } = jwt.verify(token, "dev");
  const storyPart = await StoryPart.findById(storyPartId);
  if (!storyPart) {
    const error = new Error(`Error finding story parts for ${storyId}`);
    throw error;
  }
  if (storyPart.owner.toString() !== user) {
    const error = new Error("User unauthorized to access this story part");
    throw error;
  }

  const deletionResult = StoryPart.findByIdAndDelete(storyPartId);
  return deletionResult;
};
module.exports = {
  createStoryPart,
  readStoryPart,
  getStoryParts,
  updateStoryPart,
  deleteStoryPart,
};
