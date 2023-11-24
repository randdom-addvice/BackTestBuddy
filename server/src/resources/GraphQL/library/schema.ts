export default /* GraphQL */ `
  type Query {
    hello: String
  }
`;

// type Query {
//   getUser(id: ID!): User
//   getLibrary(id: ID!): Library
//   getStrategy(id: ID!): Strategy
// }

// type Mutation {
//   createLibrary(name: String!, description: String!): Library
//   #createStrategy(name: String!, description: String!): Strategy
//   #addLibraryToUser(userId: ID!, libraryId: ID!): User
//   #addStrategyToLibrary(libraryId: ID!, strategyId: ID!): Library
// }
