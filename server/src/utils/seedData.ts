// @ts-nocheck
import mongoose, { ObjectId } from "mongoose";
import Library from "@/resources/GraphQL/library/model";
import Strategy from "@/resources/GraphQL/strategy/model";
import User from "@/resources/GraphQL/user/model";
import config from "@/config/config";

const strategies = [
  {
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
        0, 1.5, 3, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 13, 14, 13, 14, 13,
        14.5, 16, 17.5, 19, 20.5, 22, 23.5, 25, 24, 25.5, 27, 28.5, 30, 31.5,
      ],
    },
  },
  {
    id: 1696079388485,
    name: "Tests",
    description: "test",
    strategies: [
      {
        name: "SEPTEMBER USDJPYM1 (HTF CONFIRMATION-Dual confirmation on 5M chart)",
        description:
          "1:1.5rr, session= 14:00 - 19:00(Server Time mt5) (CTRADER 11:00 - 16:00), Start=SEP 4TH 4weeks (1 month); Risk=1%\nTenkan sen+Kijun sen and kumo confirmations must be checked on the 5M chart\n",
        id: 1696080224421,
        history: [],
        tradeDetails: {
          totalTrades: 39,
          totalLossesPercent: 28,
          totalWinningsPercent: 72,
          totalLosses: 11,
          totalWinnings: 28,
          percentageWin: 72,
          profitGain: 31,
          tradesSequence: [
            1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, -1, -1, 1.5, 1.5, 1.5, 1.5,
            1.5, 1.5, -1, 1.5, -1, 1.5, 1.5, -1, 1.5, 1.5, 1.5, -1, 1.5, 1.5,
            -1, -1, -1, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
          ],
          growth: [
            0, 1.5, 3, 4.5, 6, 7.5, 9, 8, 9.5, 8.5, 7.5, 9, 10.5, 12, 13.5, 15,
            16.5, 15.5, 17, 16, 17.5, 19, 18, 19.5, 21, 22.5, 21.5, 23, 24.5,
            23.5, 22.5, 21.5, 20.5, 22, 23.5, 25, 26.5, 28, 29.5,
          ],
        },
      },
      {
        name: "ASIAN SESSION SEPTEMBER USDJPYM1 (HTF CONFIRMATION-Dual confirmation on 5M chart)",
        description:
          "ASIAN SESSION 1:1.5rr, session= (CTRADER 12:00 - 04:00), Start=SEP 4TH 4weeks (1 month); Risk=1%\nTenkan sen+Kijun sen and kumo confirmations must be checked on the 5M chart\n",
        id: 1696199981694,
        history: [],
        tradeDetails: {
          totalTrades: 45,
          totalLossesPercent: 24,
          totalWinningsPercent: 76,
          totalLosses: 11,
          totalWinnings: 34,
          percentageWin: 76,
          profitGain: 40,
          tradesSequence: [
            1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
            1.5, -1, 1.5, 1.5, -1, -1, 1.5, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
            1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, -1, -1, -1, 1.5, 1.5, 1.5,
            1.5, -1, 1.5,
          ],
          growth: [
            0, 1.5, 3, 4.5, 6, 7.5, 6.5, 8, 7, 8.5, 10, 11.5, 13, 14.5, 16,
            17.5, 16.5, 18, 19.5, 18.5, 17.5, 19, 18, 19.5, 21, 22.5, 24, 25.5,
            27, 28.5, 30, 31.5, 33, 34.5, 33.5, 35, 36.5, 35.5, 34.5, 33.5, 35,
            36.5, 38, 39.5, 38.5,
          ],
        },
      },
      {
        name: "SEPTEMBER AMAZON M1 (14:00 - 19:00)",
        description:
          "1:1.5rr, session= 14:00 - 19:00(Server Time CTRADER), Start=June 5 to 1 month; Risk=1%\nTenkan-sen and Kumo rules must be checked\n",
        id: 1696960532441,
        history: [],
        tradeDetails: {
          totalTrades: 40,
          totalLossesPercent: 40,
          totalWinningsPercent: 60,
          totalLosses: 16,
          totalWinnings: 24,
          percentageWin: 60,
          profitGain: 20,
          tradesSequence: [
            1.5, -1, 1.5, 1.5, -1, -1, -1, 1.5, 1.5, -1, 1.5, 1.5, 1.5, 1.5,
            1.5, 1.5, -1, -1, 1.5, 1.5, 1.5, 1.5, -1, 1.5, 1.5, -1, -1, 1.5, -1,
            -1, -1, 1.5, -1, 1.5, -1, 1.5, 1.5, -1, 1.5, 1.5,
          ],
          growth: [
            0, 1.5, 0.5, 2, 3.5, 2.5, 1.5, 0.5, 2, 3.5, 2.5, 4, 5.5, 7, 8.5, 10,
            11.5, 10.5, 9.5, 11, 12.5, 11.5, 12.5, 14, 15.5, 14.5, 16, 17.5, 19,
            17.5, 16.5, 15.5, 17, 16, 15, 14, 15.5, 14.5, 16, 15, 16.5, 18, 17,
            18.5, 20, 21.5,
          ],
        },
      },
      {
        name: "USDJPY OCTOBER Asian Session",
        description:
          "ASIAN SESSION 1:1.5rr, session= (CTRADER 12:00 - 04:00) Risk=1%\nTenkan sen+Kijun sen confirmations must be checked on the 5M chart\n",
        id: 1697248769589,
        history: [],
        tradeDetails: {
          totalTrades: 29,
          totalLossesPercent: 28,
          totalWinningsPercent: 72,
          totalLosses: 8,
          totalWinnings: 21,
          percentageWin: 72,
          profitGain: 23.5,
          tradesSequence: [
            1.5, -1, 1.5, 1.5, 1.5, -1, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
            -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, -1, 1.5, -1, 1.5, -1, 1.5,
            1.5,
          ],
          growth: [
            0, 1.5, 0.5, 2, 0.5, 2, 3.5, 5, 4, 3, 4.5, 6, 7.5, 9, 10.5, 12,
            13.5, 15, 13.5, 12.5, 14, 15.5, 17, 18.5, 20, 21.5, 20.5, 19.5, 21,
            20, 21.5, 20.5, 22,
          ],
        },
      },
      {
        name: "t",
        description: "t",
        id: 1698315170992,
        history: [],
        tradeDetails: {
          totalTrades: 23,
          totalLossesPercent: 22,
          totalWinningsPercent: 78,
          totalLosses: 5,
          totalWinnings: 18,
          percentageWin: 78,
          profitGain: 22,
          tradesSequence: [
            1.5, -1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, -1, -1, 1.5, 1.5,
            1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, -1, 1.5, -1, -1, 1.5, 1.5, 1.5,
            1.5, 1.5, 1.5, 1.5,
          ],
          growth: [
            0, 1.5, 0.5, 2, 3.5, 5, 6.5, 8, 6.5, 5, 6.5, 8, 7, 6, 5, 6.5, 7.5,
            9, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18, 17, 18.5, 17.5, 18.5, 17.5,
            19, 20.5, 19, 17.5, 19, 20.5, 19, 20.5, 19, 20.5,
          ],
        },
      },
    ],
  },
];

const userData = [
  {
    username: "user",
    email: "user@mail.com",
    password: "password",
    libraries: [],
  },
  {
    username: "user 2",
    email: "user2@mail.com",
    password: "password",
    libraries: [],
  },
];

export async function seedDatabase(cb: any) {
  try {
    // await mongoose.connect(config.server.mongoUrl);
    await cb();

    await User.deleteMany({});
    await Library.deleteMany({});
    await Strategy.deleteMany({});

    userData.forEach(async (i, index) => {
      const user = await User.create(i);
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
      const createdStrategy = await Strategy.create(strategies[index]);
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
