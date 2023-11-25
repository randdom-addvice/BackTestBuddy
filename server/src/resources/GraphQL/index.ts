import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";

import library from "@/graphql/library/schema";
import libraryResolver from "@/graphql/library/resolver";

const mergedSchemas = mergeTypeDefs([library]);
const mergedResolvers = mergeResolvers([libraryResolver]);

export { mergedSchemas, mergedResolvers };
