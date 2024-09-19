import { createTheme } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    dashboardColors: {
      boxBackground: string;
      boxTextColor: string;
      boxIconColor: string;
      boxIconbackground: string;
    };
  }
  interface PaletteOptions {
    dashboardColors?: {
      boxBackground?: string;
      boxTextColor?: string;
      boxIconColor?: string;
      boxIconbackground?: string;
    };
  }
}
const lightPalette = {
  primary: {
    main: "#152C5B",
  },
  secondary: {
    main: "#203FC7",
    dark: "#D87D3F",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },

  text: {
    primary: "#000000",
  },
  dashboardColors: {
    boxBackground: "rgba(26, 27, 30, 1)",
    boxTextColor: "#ffffff",
    boxIconColor: "rgba(32, 63, 199, 1)",
    boxIconbackground: "rgba(32, 63, 199, 0.2)",
  },
};

const darkPalette = {
  primary: {
    main: "#ffffff",
  },
  secondary: {
    main: "#FFFFF",
    dark: "#093022",
  },
  background: {
    default: "#121212",
    paper: "#1d1d1d",
  },
  text: {
    primary: "#ffffff",
  },
  dashboardColors: {
    boxBackground: "#404040",
    boxTextColor: "#e0e0e0",
    boxIconColor: "#0099ff",
    boxIconbackground: "rgba(0, 153, 255, 0.1)",
  },
};

const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightPalette : darkPalette),
    },
  });

export default theme;
