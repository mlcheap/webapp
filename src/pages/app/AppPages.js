import React from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "../../routes";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import GmailSidebarItemDemo from "../../components/Sidebar";
import { TrendyListItemDemo } from "../../components/SidebarHead";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import {
  Root,
  getHeader,
  getContent,
  getDrawerSidebar,
  getSidebarContent,
  getFooter,
  getSidebarTrigger,
  getCollapseBtn,
  getContentBasedScheme,
} from "@mui-treasury/layout";

const Header = getHeader(styled);
const Content = getContent(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Footer = getFooter(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const CollapseBtn = getCollapseBtn(styled);

const contentBasedScheme = getContentBasedScheme();

const AppPage = () => {
  let navigate = useNavigate();

  let routing = useRoutes(appRoutes());
  const navigateProject = (e) => {
    navigate(`/app/initial`);
  };
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root scheme={contentBasedScheme}>
        {({ state: { sidebar } }) => (
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                <Button
                  sx={{ textTransform: "none", color: "#616161" }}
                  startIcon={<HomeIcon />}
                  onClick={navigateProject}
                >
                  Projects
                </Button>

                {/* <HeaderMockUp /> */}
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>
                <TrendyListItemDemo
                  collapsed={sidebar.primarySidebar.collapsed}
                />

                <GmailSidebarItemDemo />
              </SidebarContent>
              <CollapseBtn />
            </DrawerSidebar>
            <Content>{routing}</Content>
            <Footer>{/* <FooterMockUp /> */}</Footer>
          </>
        )}
      </Root>
    </StylesProvider>
  );
};

export default AppPage;
