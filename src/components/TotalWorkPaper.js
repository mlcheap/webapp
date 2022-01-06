import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

const TotalWorkPaper = () => {
  const font_size = "24px";
  return (
    <Paper sx={{ padding: "16px", height: "100%" }}>
      <List>
        <ListItem
          disablePadding
          secondaryAction={
            <ListItemButton>
              <ListItemText
                primary="24h"
                primaryTypographyProps={{ fontSize: font_size }}
              />
            </ListItemButton>
          }
        >
          <ListItemButton>
            <ListItemText
              primary="total hours"
              primaryTypographyProps={{ fontSize: font_size }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          secondaryAction={
            <ListItemButton>
              <ListItemText
                primary="148"
                primaryTypographyProps={{ fontSize: font_size }}
              />
            </ListItemButton>
          }
        >
          <ListItemButton>
            <ListItemText
              primary="total labels"
              primaryTypographyProps={{ fontSize: font_size }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          secondaryAction={
            <ListItemButton>
              <ListItemText
                primary="1"
                primaryTypographyProps={{ fontSize: font_size }}
              />
            </ListItemButton>
          }
        >
          <ListItemButton>
            <ListItemText
              primary="total projects"
              primaryTypographyProps={{ fontSize: font_size }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};
export default TotalWorkPaper;
