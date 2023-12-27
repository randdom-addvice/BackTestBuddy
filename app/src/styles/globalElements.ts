import styled from "styled-components";

type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";
type JustifyContent =
  | "center"
  | "space-between"
  | "space-around"
  | "flex-start"
  | "flex-end";
type AlignContent =
  | "center"
  | "baseline"
  | "start"
  | "flex-start"
  | "flex-end"
  | "normal"
  | "initial";

export const StyledFlex = styled.div<{
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignContent;
  width?: string;
  height?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  justify-content: ${(props) => props.justify ?? "space-between"};
  align-items: ${(props) => props.align ?? "center"};
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "initial"};
  gap: ${(props) => props.gap ?? "initial"};
`;

export const StyledContainer = styled.div<{ width?: string }>`
  width: ${(props) => props.width ?? "100%"};
  margin: auto;
`;

export const StyledCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
