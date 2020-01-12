const { buildSchema } = require("graphql");
const User = require("./user");
const Story = require("./story");
const Field = require("./field");
const StoryPart = require("./storyPart");
const { createUser, readUser } = require("../src/mongo/dbActions/User");
const { readStory, createStory } = require("../src/mongo/dbActions/Story");
const {
  readStoryPart,
  createStoryPart
} = require("../src/mongo/dbActions/StoryPart");
const schema = buildSchema(`
  type Query {
    user(username: String!): User
    story(storyId: String!): Story
    storyPart(storyPartId: String!): StoryPart
  },
  type Mutation {
    createUser(username: String!, password: String!): User
    createStory(owner: String!, title: String!, synopsis: String): Story
    createStoryPart(owner: String!, title: String!, synopsis: String): Story
  },
  ${User},
  ${Field},
  ${Story},
  ${StoryPart}
`);
const root = {
  user: readUser, // Resolver function to return user with specific id,
  story: readStory,
  createStory: createStory,
  createUser: createUser
};

module.exports = { schema, root };
