import { DefaultTheme } from "styled-components";

const colors = {
  mainLight: "#dad7cd",
  mainDark: "#344e41",
  accent1: "#3a5a40",
  accent2: "#588157",
  accent3: "#a3b18a",
  mediumGrey: "#b79f8f",
  lightGrey: "#f7f7f7",
  grey: "#69655a",
  black: "#191919",
  white: "#ffffff",
  red: "#e63946",
  primaryColor: "#ceff7b",
  secondaryColor: "#2ecc71",
};

export const defaultTheme: DefaultTheme = {
  borderRadius: "4px",
  spacing: (spacing: number = 16) => `${spacing}px`,
  colors,
};
