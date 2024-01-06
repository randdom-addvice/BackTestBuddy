import { ObjectId } from "mongoose";
import LibraryModel from "../library/model";
import MongooseServices from "../services";
import StrategyModel from "./model";
import { IStrategy, ITradeStats } from "./types";
import {
  catchGraphQLError,
  throwGraphQLError,
} from "@/resources/services/errorHandler";
import { IUser } from "../user/types";

const resolvers = {
  Query: {
    getStrategies: async (_: any, { library_id }: { library_id: string }) => {
      // const library = await MongooseServices.getEntity(
      //   LibraryModel,
      //   {
      //     _id: library_id,
      //   },
      //   { lean: false }
      // );
      const strategies = await MongooseServices.getEntities(
        StrategyModel,
        {
          library_id,
        },
        { lean: false }
      );
      console.log(strategies);
      // const strategies = library?.strategies ?? [];
      return strategies;
    },
    getStrategy: async (_: any, { id }: { id: string }) => {
      try {
        const strategy = await MongooseServices.getEntity(
          StrategyModel,
          {
            _id: id,
          },
          { lean: false }
        );
        if (!strategy) throwGraphQLError("NOT_FOUND", "strategy not found!");
        return strategy;
      } catch (error) {
        catchGraphQLError(error);
      }
    },
  },
  Mutation: {
    createStrategy: async (
      _: any,
      {
        createStrategyInput: { library_id, name, description, startingBalance },
      }: {
        createStrategyInput: Pick<IStrategy, "name" | "description"> & {
          library_id: string;
          startingBalance: number;
        };
      },
      { user }: { user?: IUser }
    ) => {
      try {
        console.log({
          tradeStats: {
            initialBalance: startingBalance,
          },
        });
        if (!user)
          return throwGraphQLError(
            "FORBIDDEN",
            "You are not authorized to perform this action."
          );
        const createdStrategy = await MongooseServices.createEntity(
          StrategyModel,
          {
            name,
            description,
            user_id: user._id,
            library_id,
            tradeStats: {
              initialBalance: startingBalance,
            },
          } as never as IStrategy
        );

        if (!createdStrategy) return false;

        const updatedLibrary = await MongooseServices.findAndUpdate(
          LibraryModel,
          { _id: library_id },
          { $push: { strategies: createdStrategy._id } },
          { new: true }
        );

        if (!updatedLibrary) {
          await MongooseServices.deleteEntity(StrategyModel, {
            _id: createdStrategy._id,
          });
          return false;
        }

        return true;
      } catch (error) {
        throwGraphQLError("INTERNAL_SERVER_ERROR", "Something went wrong");
      }
    },
    deleteStrategy: async (_: any, { id }: { id: string }) => {
      try {
        const deleteSuccess = await MongooseServices.deleteEntity(
          StrategyModel,
          { _id: id }
        );
        if (!deleteSuccess) return false;
        return true;
      } catch (error) {
        return false;
      }
    },
    updateStrategyDetails: async (
      _: any,
      {
        updateStrategyInput: { name, description, startegy_id },
      }: {
        updateStrategyInput: {
          name: string;
          description: string;
          startegy_id: string;
        };
      }
    ) => {
      try {
        await MongooseServices.findAndUpdate(
          StrategyModel,
          { _id: startegy_id },
          {
            $set: {
              name: name,
              description: description,
            },
          }
        );
        return true;
      } catch (error) {
        return false;
      }
    },
    updateStrategyStats: async (
      _: any,
      {
        updateStrategyStatsInput,
        strategy_id,
      }: {
        updateStrategyStatsInput: ITradeStats;
        strategy_id: string;
      }
    ) => {
      try {
        await MongooseServices.findAndUpdate(
          StrategyModel,
          { _id: strategy_id },
          {
            $set: {
              tradeStats: { ...updateStrategyStatsInput },
            },
          }
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default resolvers;
