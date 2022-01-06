import React from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../../routes";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Footer";
import AppBar from "../../components/AppBar";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const AppPage = () => {
  let routing = useRoutes(appRoutes);
  const [open, setOpen] = React.useState(false);

  const handleClickAway = () => {
    console.log("handle away");
    setOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ClickAwayListener onClickAway={handleClickAway}>
        <AppBar open={open} setOpen={setOpen} />
      </ClickAwayListener>

      {routing}
      <Footer>{/* <FooterMockUp /> */}</Footer>
    </StyledEngineProvider>
  );
};

export default AppPage;
