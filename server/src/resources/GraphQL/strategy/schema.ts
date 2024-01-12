export default /* GraphQL */ `
  enum Direction {
    LONG
    SHORT
  }
  type TradeSequenceDetail {
    asset: String!
    value: Float!
    commission: Float!
    direction: Direction!
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
    profitGain: Float!
    profitFactor: Float!
    tradesSequence: [TradeSequenceDetail!]!
    growth: [TradeSequenceDetail!]!
  }

  type Strategy {
    _id: ID!
    library_id: ID!
    name: String!
    description: String!
    tradeStats: TradeStats!
  }

  input TradeSequenceDetailInput {
    asset: String!
    value: Float!
    commission: Float!
    direction: Direction!
  }

  input CreateStrategyInput {
    name: String!
    description: String!
    library_id: ID!
    startingBalance: Float!
  }

  input UpdateStrategyDetailsInput {
    name: String!
    description: String!
    strategy_id: ID!
  }

  input UpdateStrategyStatsInput {
    tradesSequence: [TradeSequenceDetailInput]!
    strategy_id: ID!
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
    ): Boolean!
    deleteStrategy(id: ID!): Boolean!
  }
`;
