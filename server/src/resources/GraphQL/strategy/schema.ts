export default /* GraphQL */ `
  type Growth {
    asset: String!
    value: Float!
  }
  type TradeStats {
    _id: ID
    winCountValue: Float!
    lossCountValue: Float!
    balance: Float!
    initialBalance: Float!
    totalTrades: Int!
    totalLossesPercent: Int!
    totalWinningsPercent: Int!
    totalLosses: Int!
    totalWinnings: Int!
    percentageWin: Int!
    profitGain: Int!
    profitFactor: Int!
    tradesSequence: [Float]!
    growth: [Growth]!
  }

  type Strategy {
    _id: ID!
    library_id: ID!
    name: String!
    description: String!
    tradeStats: TradeStats!
  }

  input CreateStrategyInput {
    name: String!
    description: String!
    library_id: ID!
    startingBalance: Float!
  }

  input UpdateStrategyDetailsInput {
    winCountValue: Float!
    description: String!
    strategy_id: ID!
  }

  input UpdateStrategyStatsInput {
    winCountValue: Float!
    lossCountValue: Float!
    totalLosses: Int!
    totalWinnings: Int!
    profitGain: Float!
    profitFactor: Float!
    tradesSequence: [Float]!
    growth: [Float]!
  }

  type Query {
    getStrategies(library_id: ID!): [Strategy]!
    getStrategy(id: ID!): Strategy
  }

  type Mutation {
    createStrategy(createStrategyInput: CreateStrategyInput): Boolean!
    updateStrategyDetails(
      updateStrategyInput: UpdateStrategyDetailsInput
    ): Boolean!
    updateStrategyStats(
      updateStrategyStatsInput: UpdateStrategyStatsInput
      strategy_id: ID!
    ): Boolean!
    deleteStrategy(id: ID!): Boolean!
  }
`;
