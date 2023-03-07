import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

//Styles型の拡張
declare module "@mui/material/styles" {
  interface Palette {
    orange: {
      main: string;
    };
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
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    baseBackground: {
      main: "#F1F1F1",
    },
    orange: {
      main: "#EA5617",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
