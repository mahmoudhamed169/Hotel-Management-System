import React from "react";
import { Box, Typography } from "@mui/material";
import NODATA from "../../../assets/images/noData.jpg";

export default function NoDataFound() {
  

  return (
    <>
      <Box sx={{display:'flex', justifyContent:'center' , alignItems:'center', flexDirection:'column' }}>
        <img src={NODATA} alt="nodata" style={{width:'300px'}} />
        <Typography variant="h3" sx={{color: "#152C5B",}}> no favourite list available yet</Typography>
      </Box>
    </>
  );
}
