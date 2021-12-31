import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import WorkBarChart from "./WorkBarChart";
const Statistics = () => {
  return (
    <Grid container>
      <Grid item sx={{ width: "100%", minWidth: "350px", minHeight: "350px" }}>
        <Paper sx={{ width: "100%", height: "100%" }}>
          <WorkBarChart />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Statistics;
