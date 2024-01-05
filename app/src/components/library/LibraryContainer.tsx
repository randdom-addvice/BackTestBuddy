import React from "react";
import Accordion from "./accordion/Accordion";
import { useGetLibrariesQueryHook } from "@/graphql/queries/library/library.queries";
import { AccordionContainer } from "./accordion/elements";
import { Library } from "@/graphql/api";

const LibraryContainer = () => {
  const { data, loading, error } = useGetLibrariesQueryHook();
  console.log(data);
  if (loading) return <div>Loading Libraries</div>;
  if (error) return <div>Something went wrong, please contact support</div>;
  if (!data?.getLibraries?.length)
    return <div>No Libraries yet, start by createing one</div>;
  return (
    <AccordionContainer>
      {data.getLibraries.map(
        (lib) =>
          lib && (
            <Accordion
              key={lib._id}
              library={{
                name: lib.name,
                description: lib.description,
                id: lib._id,
              }}
              strategies={
                lib.strategies.map((i) => ({
                  id: i._id,
                  name: i.name,
                  description: i.description,
                  totalTrades: i.tradeStats.totalTrades,
                  percentageWin: i.tradeStats.percentageWin,
                  profitGain: i.tradeStats.profitGain,
                })) ?? []
              }
            />
          )
      )}
    </AccordionContainer>
  );
};

export default LibraryContainer;
