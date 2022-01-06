import React, { useState, useEffect } from "react";
import { userInfo } from "../../../../services/userInfo";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import TimeFilter from "../../../../components/TimeFilter";
import HourStatistics from "../../../../components/HourStatisticsPaper";
import TotalWorkPaper from "../../../../components/TotalWorkPaper";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1,
  },
};

function ReportsPage(props) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const user = userInfo();
  const { classes } = props;
  const onFilterClick = (from, to) => () => {
    console.log("filter clicked", from, to);
  };
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      style={{ padding: "12px", marginBottom: "40px" }}
    >
      <Grid item xs={12}>
        <TimeFilter onFilter={onFilterClick} />
      </Grid>
      <Grid item sm={12} xs={12} md={8}>
        <HourStatistics />
      </Grid>
      <Grid item sm={12} xs={12} md={4}>
        <TotalWorkPaper />
      </Grid>
    </Grid>
  );
}

ReportsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportsPage);
