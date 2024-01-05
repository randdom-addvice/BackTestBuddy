import { DefaultTheme } from "styled-components";

const colors = {
  mainLight: "#750550",
  mainDark: "#4a0433",
  accent1: "#3a5a40",
  accent2: "#30813f",
  accent3: "#366940",
  mediumGrey: "#dfdad7",
  lightGrey: "#e4e4e4",
  grey: "#69655a",
  black: "#191919",
  black2: "#a3a5ae",
  white: "#ffffff",
  red: "#e63946",
  blue: "#4070F4",
  primary: "#4070F4",
  primaryColor: "#ceff7b",
  secondaryColor: "#2ecc71",
};

export const defaultTheme: DefaultTheme = {
  borderRadius: "4px",
  spacing: (spacing: number = 16) => `${spacing}px`,
  colors,
};
