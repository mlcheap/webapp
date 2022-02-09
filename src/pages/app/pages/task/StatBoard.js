import React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function StatBar({
  total_labeled,
  total_remain,
  total_skipped,
}) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{ mx: "auto" }}
    >
      <Tooltip title="total tasks skipped!">
        <Button endIcon={<SkipNextIcon />}>{total_skipped}</Button>
      </Tooltip>
      <Tooltip title="total labeled!">
        <Button color="success" endIcon={<CheckCircleIcon />}>
          {total_labeled}
        </Button>
      </Tooltip>
      {/* <Tooltip title="total tasks remain!">
        <Button endIcon={<PendingIcon />}>{total_remain}</Button>
      </Tooltip> */}
    </ButtonGroup>
  );
}
