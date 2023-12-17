import "styled-components";

type ThemeSpacing = 1 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 64 | 128;

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    spacing: (space: ThemeSpacing) => string;
    colors: {
      mainLight: string;
      mainDark: string;
      accent1: string;
      accent2: string;
      accent3: string;
      mediumGrey: string;
      lightGrey: string;
      grey: string;
      black: string;
      white: string;
      red: string;
      primaryColor: string;
      secondaryColor: string;
    };
  }
}
