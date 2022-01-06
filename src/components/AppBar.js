import * as React from "react";
import Drawer from "./Drawer";
import AppBarHeader from "./AppBarHeader";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const AppBar = ({ open, setOpen }) => {
  let navigate = useNavigate();
  const handleDrower = (boolean) => (e) => {
    setOpen(boolean);
  };
  const navigateProject = (e) => {
    navigate(`/app/initial`);
  };
  return (
    <Box sx={{ display: "flex", marginBottom: "70px" }}>
      <CssBaseline />
      <AppBarHeader
        navigateProject={navigateProject}
        open={open}
        handleDrawerOpen={handleDrower(true)}
      />
      <Drawer
        sidebarId="primarySidebar"
        open={open}
        handleDrawerClose={handleDrower(false)}
      ></Drawer>
    </Box>
  );
};
export default AppBar;
