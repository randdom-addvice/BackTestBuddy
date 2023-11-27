import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";

import libraryTypeDef from "@/graphql/library/schema";
import strategyTypeDef from "@/graphql/strategy/schema";
import userTypeDef from "@/graphql/user/schema";

import libraryResolver from "@/graphql/library/resolver";
import strategyResolver from "@/graphql/strategy/resolver";
import userResolver from "@/graphql/user/resolver";

const mergedSchemas = mergeTypeDefs([
  libraryTypeDef,
  strategyTypeDef,
  userTypeDef,
]);
const mergedResolvers = mergeResolvers([
  libraryResolver,
  strategyResolver,
  userResolver,
]);

export { mergedSchemas, mergedResolvers };
