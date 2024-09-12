import { Typography } from "@mui/material";

export default function MainTitle() {
  return (
    <>
      <Typography
        variant="h3"
        component={"h1"}
        sx={{
          color: "#152C5B",
          fontWeight: "500",
          fontSize: "1.75rem",
        }}
      >
        <Typography
          variant="h3"
          component={"span"}
          sx={{ color: "#3252DF", ontWeight: "500", fontSize: "1.75rem" }}
        >
          Stay
        </Typography>
        cation.
      </Typography>
    </>
  );
}
