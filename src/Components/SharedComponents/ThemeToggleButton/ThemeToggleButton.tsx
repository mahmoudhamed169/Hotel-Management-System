import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppTheme } from "../../../Context/ThemeContext/ThemeContext";

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <IconButton onClick={toggleTheme} sx={{ color: "#0d80d8" }}>
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
