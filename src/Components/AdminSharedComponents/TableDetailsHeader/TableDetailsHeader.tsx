import { Box, Typography, Button } from "@mui/material";
import React from "react";
import theme from "../../../Context/ThemeContext/theme";
import { useTheme } from "@emotion/react";

export default function TableDetailsHeader({ title, buttonTitle, href }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "37px 0",
      }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          fontSize="23px"
          fontWeight="500"
          variant="body2"
          component="span">
          {title} Table Details
        </Typography>
        <Typography fontSize="14px" variant="body2" component="span">
          You can check all details
        </Typography>
      </Box>
      <Button
        variant="contained"
        href={href}
        sx={{
          background: theme.palette.secondary.main,
          padding: "14px 57px",
          borderRadius: "8px",
          fontWeight: "600",
        }}>
        {buttonTitle}
      </Button>
    </Box>
  );
}
