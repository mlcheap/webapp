import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { signupUser } from "../../../services/auth_api";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const genders = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
];

export default function SignUp({ setUser }) {
  const [gender, setGender] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signupUser({
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("fullName"),
      gender: data.get("gender"),
    }).then((response) => {
      if (response.status !== 200) {
        setSnackbarMessage(response.message);
        setOpenSnackbar(true);
      }

      setUser(Object.assign(response.data, response.meta));
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={gender ?? ""}
                  onChange={handleGenderChange}
                  helperText="Please select your gender"
                  // autoComplete="gender"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          key={snackbarMessage}
        />
      </Container>
    </ThemeProvider>
  );
}
