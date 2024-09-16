import { Button, CircularProgress } from "@mui/material";

interface ButtonFormProps {
  name: string;
  isSubmitting?: boolean;
}

export default function ButtonForm({
  name,
  isSubmitting = false,
}: ButtonFormProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      type="submit"
      disabled={isSubmitting}
      sx={{
        backgroundColor: "#3252DF",
        color: "#ffff",
        textTransform: "none",
        boxShadow: "0px 8px 15px 0px #3252DF4D",
        height: "50px",
        "&:hover": {
          backgroundColor: "#0039CB",
        },
        "&:disabled": {
          backgroundColor: "#0039CB",
          color: "#ffff",
        },
      }}
      startIcon={
        isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {isSubmitting ? "Sending..." : name}
    </Button>
  );
}
