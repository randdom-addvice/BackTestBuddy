// @ts-nocheck
import mongoose, { ObjectId } from "mongoose";
import Library from "@/resources/GraphQL/library/model";
import Strategy from "@/resources/GraphQL/strategy/model";
import User from "@/resources/GraphQL/user/model";
import config from "@/config/config";

const strategy = {
  name: "Test Name2",
  description:
    "1:1.5rr, session= 14:00 - 19:00(Server Time mt5) (CTRADER 11:00 - 16:00), Start=April 3 to April 28th (1 month); Risk=1%\nTenkan sen+Kijun sen and kumo confirmations must be checked on the 5M chart\n",
  id: 1695181719305,
  history: [],
  tradeDetails: {
    totalTrades: 25,
    totalLossesPercent: 12,
    totalWinningsPercent: 88,
    totalLosses: 3,
    totalWinnings: 22,
    percentageWin: 88,
    profitGain: 30,
    tradesSequence: [
      1.5, 1.5, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, 1.5,
      1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, 1.5, 1.5,
    ],
    growth: [
      0, 1.5, 3, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 13, 14, 13, 14, 13, 14.5,
      16, 17.5, 19, 20.5, 22, 23.5, 25, 24, 25.5, 27, 28.5, 30, 31.5,
    ],
  },
};

const userData = {
  username: "user",
  email: "user@mail.com",
  password: "password",
  libraries: [],
};

export async function seedDatabase(cb: any) {
  try {
    await mongoose.connect(config.server.mongoUrl);

    // Clear existing data
    await User.deleteMany({});
    await Library.deleteMany({});
    await Strategy.deleteMany({});

    // Seed the data
    const user = await User.create(userData);
    const seedData = {
      name: "ULTIMATE_ICHI HF_Confirmation2",
      description: "test description",
      strategies: [],
      user_id: user._id,
    };
    const data = await Library.create(seedData);
    const createdStrategy = await Strategy.create(strategy);
    data.strategies.push(createdStrategy._id);
    await data.save();
    console.log(data);
    // console.log(createdStrategy);

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    cb();
  }
}

// Run the seed function
// seedDatabase();
