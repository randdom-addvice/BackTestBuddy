import React from "react";
import Accordion from "./accordion/Accordion";
import { useGetLibrariesQueryHook } from "@/graphql/queries/library/library.queries";
import { AccordionContainer } from "./accordion/elements";

const LibraryContainer = () => {
  const { data, loading, error } = useGetLibrariesQueryHook();

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
              name={lib.name}
              description={lib.description}
              _id={lib._id}
            />
          )
      )}
    </AccordionContainer>
  );
};

export default LibraryContainer;
