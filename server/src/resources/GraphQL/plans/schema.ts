export default /* GraphQL */ `
  enum Interval {
    MONTHLY
    YEARLY
  }

  type Pro {
    _id: ID!
    user: ID!
    proplan: ID!
    startDate: String!
    endDate: String!
    interval: Interval!
    active: Boolean!
    duration: Int!
    payment_cancel: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
