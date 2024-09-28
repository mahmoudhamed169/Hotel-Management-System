import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

interface CapacitySelectorProps {
  onCountChange: (count: number) => void;
  maxCapacity: number;
}

function CapacitySelector({
  onCountChange,
  maxCapacity,
}: CapacitySelectorProps) {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (count < maxCapacity) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <Box sx={{ mt: "0.5rem", display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleDecrease}
        sx={{
          width: "3.5rem",
          backgroundColor: "#E74C3C",
          borderRadius: "4px 0px 0px 0px",
          "&:hover": {
            backgroundColor: "#E74C3C",
          },
          mr: "1rem",
        }}
      >
        <Remove sx={{ color: "#fff" }} />
      </IconButton>
      <TextField
        sx={{ color: "#152C5B" }}
        label="Capacity"
        value={`${count} person${count > 1 ? "s" : ""}`}
        InputProps={{
          readOnly: true,
        }}
      />
      <IconButton
        onClick={handleIncrease}
        sx={{
          width: "3.5rem",
          backgroundColor: "#1ABC9C",
          borderRadius: "0px 4px 0px 0px",
          "&:hover": {
            backgroundColor: "#1ABC9C",
          },
          ml: "1rem",
        }}
      >
        <Add sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
}

export default CapacitySelector;
