import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

const TimeFilter = () => {
  const [value, setValue] = React.useState(new Date());

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
              minHeight: 90,
              bgcolor: "background.default",
            }}
          >
            <Grid sx={{ flexGrow: 1, paddingLeft: 2 }} container spacing={2}>
              <Grid item xs={2}>
                <MobileDatePicker
                  label="from"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={2}>
                <MobileDatePicker
                  label="to"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeFilter;
