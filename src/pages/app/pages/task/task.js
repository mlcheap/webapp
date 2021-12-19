import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { json_obj } from "./sample";
import SearchBox from "./SearchBox";
import Labels from "./Label";

export default function TaskPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectItem, setSelectItem] = useState(0);

  // {searchParams.get("project_id")}
  const task = json_obj.tasks[0];
  const predicted_labels = task["meta-label"]["predicted-labels"];

  return (
    <Box>
      <Box align="center" justify="center" alignItems="center">
        <SearchBox />
      </Box>
      <Grid container spacing={2} sx={{ padding: "48px" }}>
        <Grid item xs={9}>
          <Box sx={{ padding: "10px" }}>
            <Paper sx={{ height: "calc( 100vh - 240px) ", padding: "20px" }}>
              <Typography
                variant="body1"
                gutterBottom
                textAlign={("justify", "left")}
                component="div"
              >
                {task["text"]}
              </Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Labels
            predicted_labels={predicted_labels}
            setSelectItem={setSelectItem}
            selectItem={selectItem}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
