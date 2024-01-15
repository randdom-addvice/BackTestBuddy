import { GraphQLJSONObject } from "graphql-type-json";
export default /* GraphQL */ `
  type ProFeatures {
    _id: ID!
    proName: String!
    features: [String!]!
    description: String!
    interval: String!
    price: Float!
    free_trial: Boolean!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
    plan_id: String!
  }

  type Query {
    getProFeatures: [ProFeatures]!
  }
`;
