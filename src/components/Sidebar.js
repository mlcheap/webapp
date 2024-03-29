import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Assessment from "@mui/icons-material/Assessment";
import Workspaces from "@mui/icons-material/Workspaces";
import { userInfo, deleteUser } from "../services/userInfo";
import { useNavigate } from "react-router-dom";

export default function SelectedListItem() {
  let navigate = useNavigate();
  userInfo();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  function handleListItemClick(event, index) {
    if (index === 2) {
      deleteUser();
      navigate("/auth/login", { replace: true });
    } else {
      setSelectedIndex(index);
      if (index === 0) {
        navigate("/app/initial", { replace: true });
      }
      if (index === 1) {
        navigate("/app/reports", { replace: true });
      }
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Workspaces />
          </ListItemIcon>
          <ListItemText primary="projects" />
        </ListItemButton>

        {/* <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary="reports" />
        </ListItemButton> */}
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}
