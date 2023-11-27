import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";

import library from "@/graphql/library/schema";
import libraryResolver from "@/graphql/library/resolver";
import strategyResolver from "@/graphql/strategy/resolver";
import strategy from "@/graphql/strategy/schema";

const mergedSchemas = mergeTypeDefs([library, strategy]);
const mergedResolvers = mergeResolvers([libraryResolver, strategyResolver]);

export { mergedSchemas, mergedResolvers };
