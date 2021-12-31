import React from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../../routes";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Footer";
import AppBar from "../../components/AppBar";
const AppPage = () => {
  let routing = useRoutes(appRoutes());

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <AppBar />
      {routing}
      <Footer>{/* <FooterMockUp /> */}</Footer>
    </StyledEngineProvider>
  );
};

export default AppPage;
