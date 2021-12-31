import React from "react";
import Avatar from "@mui/material/Avatar";
import { userInfo } from "../services/userInfo";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export const UserInfo = React.memo(function TrendyListItem() {
  let user = userInfo();
  user = user !== {} ? user : { user: { name: "", email: "" } };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar variant={"rounded"}>
          {user.user ? user.user.name[0] : "U"}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.user ? user.user.name : "name"}
        secondary={user.user ? user.user.email : "email"}
      />
    </ListItem>
  );
});
