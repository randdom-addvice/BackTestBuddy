import React from "react";
import styled from "styled-components";
import {
  AccordionContainer,
  AccordionContent,
  AccordionContentGrid,
  AccordionDetails,
  AccordionSummary,
} from "./elements";
import StrategyCard from "./StrategyCard";
import { GetLibrariesQuery, Library, Strategy } from "@/graphql/api";
import { StrategyCardType } from "../common";
interface Props {
  library: {
    name: string;
    description: string;
    id: string;
  };
  strategies: StrategyCardType[];
}

const Accordion: React.FC<Props> = ({ library, strategies }) => {
  function fetchStrategies() {}
  return (
    <>
      <AccordionDetails>
        <AccordionSummary onClick={fetchStrategies}>
          <input type="text" value={library.name} />
        </AccordionSummary>
        <AccordionContent>
          <AccordionContentGrid>
            {strategies.map((strat) => (
              <StrategyCard strategy={strat} />
            ))}
          </AccordionContentGrid>
        </AccordionContent>
      </AccordionDetails>
    </>
  );
};

export default Accordion;
