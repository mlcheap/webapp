import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const TimeFilter = ({ onFilter }) => {
  const [from, setFrom] = React.useState(new Date());
  const [to, setTo] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "grid",
        }}
      >
        <Box>
          <Paper
            elevation={3}
            sx={{
              minHeight: 110,
              padding: "8px",
              margin: "auto",
              bgcolor: "background.default",
            }}
          >
            <Grid
              sx={{ flexGrow: 1, paddingLeft: 2, margin: "auto !important" }}
              container
              spacing={2}
            >
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <MobileDatePicker
                  label="from"
                  inputFormat="MM/dd/yyyy"
                  value={from}
                  onChange={(newValue) => {
                    setFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <MobileDatePicker
                  label="to"
                  inputFormat="MM/dd/yyyy"
                  value={to}
                  onChange={(newValue) => {
                    setTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item lg={2} md={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    margin: "auto",
                    minHeight: "52px",
                  }}
                  onClick={onFilter(from, to)}
                >
                  filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeFilter;
