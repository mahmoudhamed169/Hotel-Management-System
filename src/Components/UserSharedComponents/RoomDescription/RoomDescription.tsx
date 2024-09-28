import { Box, Typography } from "@mui/material";

export default function RoomDescription() {
  return (
    <Box>
      <Typography
        variant="body1"
        component="p"
        sx={{
          fontWeight: "300",
          lineHeight: "2.1rem",
          fontSize: "1.1rem",
          color: "#B0B0B0",
        }}
      >
        Minimal techno is a minimalist subgenre of techno music. It is
        characterized by a <br /> stripped-down aesthetic that exploits the use
        of repetition and understated development. Minimal techno is thought to
        have been originally developed in the early 1990s by <br />{" "}
        Detroit-based producers Robert Hood and Daniel Bell.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{
          fontWeight: "300",
          lineHeight: "2.1rem",
          fontSize: "1.1rem",
          color: "#B0B0B0",
          marginBlock: ".6rem",
        }}
      >
        Such trends saw the demise of the soul-infused techno that typified the
        original Detroit sound. Robert Hood has noted that he and Daniel Bell
        both realized something was missing from techno in the post-rave era.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{
          fontWeight: "300",
          lineHeight: "2.1rem",
          fontSize: "1.1rem",
          color: "#B0B0B0",
        }}
      >
        Design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a prototype,
        product, or process. The national agency for design: enabling Singapore
        to use design for economic growth and to make lives better.
      </Typography>
    </Box>
  );
}
