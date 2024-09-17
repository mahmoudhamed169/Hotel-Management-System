import { Outlet } from "react-router-dom";
import MasterPageTitle from "../../Utils/MasterPageTitle";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import { useEffect } from "react";
import MainLoading from "../../Components/SharedComponents/MainLoading/MainLoading";
import { Box } from "@mui/material";
import Navbar from "../../Components/SharedComponents/Navbar/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar/Sidebar";

export default function MasterLayout() {
  MasterPageTitle();
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [setLoading]);

  if (loading) {
    return <MainLoading />;
  }
  return (

    <>
    <Box sx={{ padding: "72px" , display:'flex'}}>
    <Navbar/>
      <Outlet/>
    </Box>
    
    </>
   
  );
}
