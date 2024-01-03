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

interface Props {
  name: string;
  description: string;
  _id: string;
}

function Accordion({ name, description, _id }: Props) {
  function fetchStrategies() {}
  return (
    <>
      <AccordionDetails>
        <AccordionSummary onClick={fetchStrategies}>
          <input type="text" value={name} />
        </AccordionSummary>
        <AccordionContent>
          <AccordionContentGrid>
            <StrategyCard />
            <StrategyCard />
            <StrategyCard />
            <StrategyCard />
          </AccordionContentGrid>
        </AccordionContent>
      </AccordionDetails>
    </>
  );
}

export default Accordion;
