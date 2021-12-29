import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Info = ({ total_labeld, total_remains }) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      aria-label="contacts"
      dense={true}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon style={{ minWidth: "30px" }}>
            <DoneAllIcon />
          </ListItemIcon>
          <ListItemText primary="Labeled Items" />
          <ListItemText primary={total_labeld} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon style={{ minWidth: "30px" }}>
            <PendingActionsIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ fontSize: "0.3em !important" }}
            primary="Remain Items"
          />
          <ListItemText primary={total_remains} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
export default function MediaCard({ project, startProject }) {
  console.log("project", project["icon"]);
  return (
    <Card sx={{ maxWidth: 245, margin: "auto" }}>
      <CardMedia
        component="img"
        height="140"
        image={project["icon"]}
        // image="https://picsum.photos/400"
        alt="project icon"
      />
      <CardContent style={{ padding: "4px" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="left"
          style={{ paddingLeft: 20 }}
        >
          {project.project_name}
        </Typography>
        <Info
          total_labeld={project.total_labeled}
          total_remains={project.total_remain}
        />
      </CardContent>
      <CardActions sx={{ padding: "4px" }}>
        <Button size="big" onClick={startProject(project)}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}
