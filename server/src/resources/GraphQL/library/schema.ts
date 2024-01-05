export default /* GraphQL */ `
  type Library {
    _id: ID!
    name: String!
    description: String!
    user_id: String!
    strategies: [Strategy!]!
  }

  input ModfiyLibraryInput {
    name: String
    description: String
    library_id: String!
  }

  input CreateLibraryInput {
    name: String!
    description: String!
  }

  type Query {
    getLibraries: [Library]!
  }

  type Mutation {
    modifyLibrary(modifyLibraryInput: ModfiyLibraryInput): Boolean
    createLibrary(createLibraryInput: CreateLibraryInput): Boolean
    deleteLibrary(id: ID!): Boolean
  }
`;
