import { DotLoader } from "react-spinners";
import MainTitle from "../MainTitle/MainTitle";
import { Box } from "@mui/material";

export default function MainLoading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <DotLoader size={35} color="#3252DF" />

      <Box className="mt-5">
        <MainTitle />
      </Box>
    </Box>
  );
}
