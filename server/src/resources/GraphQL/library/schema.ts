export default /* GraphQL */ `
  type Library {
    _id: ID!
    name: String!
    description: String!
    user_id: String!
    strategies: [Strategy]
  }

  input ModfiyLibraryInput {
    name: String
    description: String
    library_id: String!
  }

  type Query {
    getLibraries: [Library]
  }

  type Mutation {
    modifyLibrary(modifyLibraryInput: ModfiyLibraryInput): Boolean
    createLibrary(createLibraryInput: ModfiyLibraryInput): Boolean
    deleteLibrary(id: ID!): Boolean
  }
`;
