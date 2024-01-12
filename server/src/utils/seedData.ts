// @ts-nocheck
import mongoose, { ObjectId } from "mongoose";
import Library from "@/resources/GraphQL/library/model";
import Strategy from "@/resources/GraphQL/strategy/model";
import User from "@/resources/GraphQL/user/model";
import config from "@/config/config";
import { generateHash } from "@/resources/services/auth";
const direction = ["LONG", "SHORT"];
const tradeSequence1 = [
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 5), direction: "LONG" },
  {
    asset: "USDCHF",
    value: Math.floor(Math.random() * -2),
    direction: "SHORT",
  },
  { asset: "USDCHF", value: Math.floor(Math.random() * -5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "LONG" },
  {
    asset: "USDCHF",
    value: Math.floor(Math.random() * -2),
    direction: "SHORT",
  },
  { asset: "USDCHF", value: Math.floor(Math.random() * -5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 5), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 5), direction: "LONG" },
  { asset: "USDCHF", value: Math.floor(Math.random() * 3), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "USDJPY", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "USDJPY", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "USDJPY", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "GBPUSD", value: 1.5, direction: "SHORT" },
  { asset: "GBPUSD", value: 3, direction: "LONG" },
  { asset: "GBPUSD", value: -1, direction: "SHORT" },
  { asset: "GBPUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: 1.5, direction: "LONG" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "USDCHF", value: -1.5, direction: "SHORT" },
  { asset: "USDJPY", value: -1.5, direction: "SHORT" },
  { asset: "USDJPY", value: -1.5, direction: "SHORT" },
  { asset: "USDJPY", value: -1.5, direction: "SHORT" },
  { asset: "USDJPY", value: -1.5, direction: "SHORT" },
  { asset: "XAUUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "SHORT" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "USDJPY", value: 1.5, direction: "SHORT" },
  { asset: "USDJPY", value: 1.5, direction: "SHORT" },
  { asset: "USDJPY", value: 1.5, direction: "SHORT" },
  { asset: "USDJPY", value: 1.5, direction: "SHORT" },
  { asset: "EURUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1.5, direction: "LONG" },
  { asset: "EURUSD", value: -1, direction: "SHORT" },
  { asset: "EURUSD", value: -1, direction: "SHORT" },
  { asset: "EURUSD", value: -2.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "SHORT" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "GPUSD", value: 1.8, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
];
const tradeSequence2 = [
  { asset: "USDJPY", value: 1.5, direction: "LONG" },
  { asset: "USDJPY", value: 3, direction: "LONG" },
  { asset: "USDJPY", value: -1, direction: "SHORT" },
  { asset: "USDJPY", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "EURUSD", value: Math.floor(Math.random() * 2), direction: "SHORT" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "GBPUSD", value: Math.floor(Math.random() * 2), direction: "LONG" },
  { asset: "GBPUSD", value: -1, direction: "SHORT" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: 1.5, direction: "LONG" },
  { asset: "GBPEUR", value: -1, direction: "SHORT" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
  { asset: "EURUSD", value: 1.5, direction: "LONG" },
];

interface Trade {
  asset: string;
  value: number;
  direction: string;
}

function calculateGrowth(tradeSequence: Trade[]): Trade[] {
  let cumulativeSum = 0;

  const growthArray: Trade[] = tradeSequence.map((trade) => {
    cumulativeSum += trade.value;

    // Randomly choose a direction for demonstration purposes
    const direction = Math.round(Math.random()) === 0 ? "LONG" : "SHORT";

    return {
      asset: trade.asset,
      value: Number(cumulativeSum),
      direction: trade.direction,
    };
  });

  return growthArray;
}

const strategies = [
  {
    name: "Test Name2",
    description:
      "1:1.5rr, session= 14:00 - 19:00(Server Time mt5) (CTRADER 11:00 - 16:00), Start=April 3 to April 28th (1 month); Risk=1%\nTenkan sen+Kijun sen and kumo confirmations must be checked on the 5M chart\n",
    id: 1695181719305,
    history: [],
    tradeStats: {
      // initialbalance: 10000,
      // totalTrades: 25,
      // totalLossesPercent: 12,
      // totalWinningsPercent: 88,
      // totalLosses: 3,
      // totalWinnings: 22,
      // percentageWin: 88,
      // profitGain: 30,
      tradesSequence: tradeSequence1,
      // growth: calculateGrowth(tradeSequence1),
      // growth: [
      //   0, 1.5, 3, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 13, 14, 13, 14, 13,
      //   14.5, 16, 17.5, 19, 20.5, 22, 23.5, 25, 24, 25.5, 27, 28.5, 30, 31.5,
      // ].map((i) => ({
      //   asset: "EURUSD",
      //   value: i,
      //   direction: direction[Math.round(Math.random * 1)],
      // })),
    },
  },
  {
    id: 1696079388485,
    name: "Tests",
    description: "test",
    tradeStats: {
      initialbalance: 10000,
      // totalTrades: 25,
      // totalLossesPercent: 12,
      // totalWinningsPercent: 88,
      // totalLosses: 3,
      // totalWinnings: 22,
      // percentageWin: 88,
      // profitGain: 30,
      tradesSequence: tradeSequence2,
      // growth: calculateGrowth(tradeSequence2),
      // tradesSequence: [
      //   1.5, 1.5, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, 1.5,
      //   1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, 1.5, 1.5,
      // ],
      // growth: [
      //   0, 1.5, 3, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 13, 14, 13, 14, 13,
      //   14.5, 16, 17.5, 19, 20.5, 22, 23.5, 25, 24, 25.5, 27, 28.5, 30, 31.5,
      // ].map((i) => ({
      //   asset: "EURUSD",
      //   value: i,
      //   direction: direction[Math.round(Math.random * 1)],
      // })),
    },
  },
];

const userData = [
  {
    username: "user",
    email: "user@mail.com",
    password: "pass",
    libraries: [],
  },
  {
    username: "user 2",
    email: "user2@mail.com",
    password: "pass",
    libraries: [],
  },
];
console.log(strategies[0].tradeStats.growth);
export async function seedDatabase(cb: any) {
  try {
    // await mongoose.connect(config.server.mongoUrl);
    await cb();

    await User.deleteMany({});
    await Library.deleteMany({});
    await Strategy.deleteMany({});

    userData.forEach(async (i, index) => {
      const user = await User.create({
        ...i,
        password: generateHash(i.password),
      });
      const seedData = [
        {
          name: "ULTIMATE_ICHI HF_Confirmation2",
          description: "test description",
          strategies: [],
          user_id: user._id,
        },
        {
          name: "Library 2",
          description: "test description",
          strategies: [],
          user_id: user._id,
        },
      ];
      const data = await Library.create(seedData[index]);

      const createdStrategy = await Strategy.create({
        ...strategies[index],
        library_id: data._id,
      });
      data.strategies.push(createdStrategy._id);
      await data.save();
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    // await mongoose.connection.close();
    console.log("end");
    // cb();
  }
}

// Run the seed function
// seedDatabase();
