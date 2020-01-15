module.exports = `
  type StoryPart {
    id: String!
    owner: String
    order: Int
    story: String
    defaultFields: [Field]
  }
`;
