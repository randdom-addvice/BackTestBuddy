export default /* GraphQL */ `
  type User {
    _id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    email_verified: Boolean!
  }

  input RegisterUserInput {
    username: String
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser: User
    #verifyToken(token: String!): User
  }

  type Mutation {
    registerUser(registerUserInput: RegisterUserInput): String!
    loginUser(email: String!, password: String!): String!
  }
`;
