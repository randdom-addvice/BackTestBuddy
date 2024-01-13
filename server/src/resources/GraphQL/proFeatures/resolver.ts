import MongooseServices from "../services";
import {
  catchGraphQLError,
  throwGraphQLError,
} from "@/resources/services/errorHandler";
import { ProFeaturesModel } from "./model";

const resolvers = {
  Query: {
    getProFeatures: async () => {
      const proFeatures = await MongooseServices.getEntities(
        ProFeaturesModel,
        {}
      );
      return proFeatures;
    },
  },
};

export default resolvers;
