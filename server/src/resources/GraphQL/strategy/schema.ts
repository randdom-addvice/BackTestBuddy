export default /* GraphQL */ `
  type TradeDetails {
    totalTrades: Int!
    totalLossesPercent: Int!
    totalWinningsPercent: Int!
    totalLosses: Int!
    totalWinnings: Int!
    percentageWin: Int!
    profitGain: Int!
    tradesSequence: [Float]!
    growth: [Float]!
  }

  type Strategy {
    _id: ID!
    library_id: ID!
    name: String!
    description: String!
    tradeDetails: TradeDetails!
  }

  input CreateStrategyInput {
    name: String!
    description: String!
    library_id: ID!
  }

  type Query {
    getStrategies(library_id: ID!): [Strategy]
    getStrategy(id: ID!): Strategy
  }

  type Mutation {
    createStrategy(createStrategyInput: CreateStrategyInput): String!
    deleteStrategy(id: ID!): Boolean
  }
`;
