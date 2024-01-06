import React from "react";
import Accordion from "./accordion/Accordion";
import { useGetLibrariesQueryHook } from "@/graphql/queries/library/library.queries";
import { AccordionContainer } from "./accordion/elements";
import { Library } from "@/graphql/api";
import { StyledCenteredDiv } from "@/styles/globalElements";

const LibraryContainer = () => {
  const { data, loading, error } = useGetLibrariesQueryHook();
  console.log(data);
  if (loading) return <StyledCenteredDiv>Loading Libraries</StyledCenteredDiv>;
  if (error)
    return (
      <StyledCenteredDiv>
        Something went wrong, please contact support
      </StyledCenteredDiv>
    );
  if (!data?.getLibraries?.length)
    return (
      <StyledCenteredDiv>
        No Libraries yet, start by createing one
      </StyledCenteredDiv>
    );
  return (
    <AccordionContainer>
      {data.getLibraries.map(
        (lib) =>
          lib && (
            <Accordion
              key={lib._id}
              // refetchgetLibraryQuery={() => refetch()}
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
