import React, { useState, useEffect } from "react";
import { userInfo } from "../../../../services/userInfo";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import TimeFilter from "../../../../components/TimeFilter";
import HourStatistics from "../../../../components/HourStatistics";
export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const user = userInfo();
  return (
    <Grid
      container
      spacing={2}
      style={{ background: grey[50], padding: "12px" }}
    >
      <Grid item xs={12}>
        <TimeFilter />
      </Grid>
      <Grid item xs={8}>
        <HourStatistics />
      </Grid>
      <Grid item xs={4}>
        <HourStatistics />
      </Grid>
    </Grid>
  );
}
