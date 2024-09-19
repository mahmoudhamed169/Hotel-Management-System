import { TextField, Typography } from "@mui/material";
import React from "react";

export default function AddFacility() {
  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Facility
      </Typography>
      <TextField
        placeholder={"Please type here"}
        InputProps={{
          sx: {
            "& input": {
              padding: "12px 16px",
            },
          },
        }}
        sx={{
          marginTop: "3px",
          width: "100%",
        }}
      />
    </>
  );
}
