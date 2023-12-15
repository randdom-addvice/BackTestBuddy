import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export const useCustomQuery = (query: DocumentNode, options?: any) => {
  return useQuery(query, options);
};
