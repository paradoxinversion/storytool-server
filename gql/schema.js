const { buildSchema } = require("graphql");
const User = require("./user");
const Story = require("./story");
const Field = require("./field");
const FieldInput = require("./fieldInput");
const StoryPart = require("./storyPart");
const { createUser, readUser } = require("../src/mongo/dbActions/User");
const {
  readStory,
  createStory,
  getUserStories
} = require("../src/mongo/dbActions/Story");
const {
  readStoryPart,
  createStoryPart,
  getStoryParts,
  updateStoryPart
} = require("../src/mongo/dbActions/StoryPart");
const schema = buildSchema(`
  type Query {
    user(username: String!): User
    story(storyId: String!): Story
    userStories(token: String!): [Story]
    storyPart(token: String!, storyPartId: String!): StoryPart
    storyParts(token: String!, storyId: String!): [StoryPart]
  },
  type Mutation {
    createUser(username: String!, password: String!): User
    createStory(token: String!, title: String!, synopsis: String): Story
    createStoryPart(token: String!, story: String!, title: String!, text: String): StoryPart
    updateStoryPart(token: String!, storyPartId: String!, updatedFields: [Field]): StoryPart
  },
  ${User},
  ${Field},
  ${FieldInput},
  ${Story},
  ${StoryPart}
`);

// Avoid using shorthand values for absolute clarity
const root = {
  user: readUser,
  story: readStory,
  createStory: createStory,
  createUser: createUser,
  userStories: getUserStories,
  storyParts: getStoryParts,
  createStoryPart: createStoryPart,
  storyPart: readStoryPart,
  updateStoryPart: updateStoryPart
};

module.exports = { schema, root };
