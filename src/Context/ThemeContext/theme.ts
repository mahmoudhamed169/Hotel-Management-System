import { createTheme } from "@mui/material/styles";

const lightPalette = {
  primary: {
    main: "#152C5B",
  },
  secondary: {
    main: "#EF9B28",
    dark: "#D87D3F",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
  text: {
    primary: "#000000",
  },
};

const darkPalette = {
  primary: {
    main: "#ffffff",
  },
  secondary: {
    main: "#0E382F",
    dark: "#093022",
  },
  background: {
    default: "#121212",
    paper: "#1d1d1d",
  },
  text: {
    primary: "#ffffff",
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
