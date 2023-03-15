import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

//Styles型の拡張
declare module "@mui/material/styles" {
  interface Palette {
    baseBackground: {
      main: string;
    };
  }
  interface PaletteOptions {
    orange?: {
      main?: string;
    };
    baseBackground: {
      main?: string;
    };
  }
}

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#EA5617",
      dark: "#a33c10",
      light: "#ee7745",
    },
    secondary: {
      dark: "#1769aa",
      main: "#2196f3",
      light: "#4dabf5",
    },
    error: {
      main: red.A400,
    },
    baseBackground: {
      main: "#FaFaFa",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
