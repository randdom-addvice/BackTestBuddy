import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";

import libraryTypeDef from "@/graphql/library/schema";
import strategyTypeDef from "@/graphql/strategy/schema";
import userTypeDef from "@/graphql/user/schema";
import proFeaturesTypeDef from "@/graphql/proFeatures/schema";

import libraryResolver from "@/graphql/library/resolver";
import strategyResolver from "@/graphql/strategy/resolver";
import userResolver from "@/graphql/user/resolver";
import proFeaturesResolver from "@/graphql/proFeatures/resolver";

const mergedSchemas = mergeTypeDefs([
  libraryTypeDef,
  strategyTypeDef,
  userTypeDef,
  proFeaturesTypeDef,
]);
const mergedResolvers = mergeResolvers([
  libraryResolver,
  strategyResolver,
  userResolver,
  proFeaturesResolver,
]);

export { mergedSchemas, mergedResolvers };
