export default /* GraphQL */ `
  type Library {
    _id: ID!
    name: String!
    description: String!
    user_id: String!
  }

  input ModfiyLibraryInput {
    name: String
    description: String
  }

  type Query {
    getLibraries: [Library]
  }

  type Mutation {
    modifyLibrary(modifyLibraryInput: ModfiyLibraryInput): Boolean
  }
`;
