import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const JobTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    // enterDelay={1000}
    // enterNextDelay={1000}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    // color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));
export { JobTooltip };
