import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 0,
  width: "100%",
  padding: 0,
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    // width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",

  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "32ch",
    },
  },
}));

export default function SearchAppBar({ onChange, options, addClass }) {
  let [autocomplete, setAutocomplete] = useState(false);
  const get_also_alternatives = (options) => {
    let all_options = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      all_options.push({ name: option.name, _id: option._id });
      for (let j = 0; j < option.alternates.length; j++) {
        const altername = eval(option.alternates[j]);
        all_options.push({
          name: altername,
          _id: option._id + "_" + j,
        });
      }
    }

    return all_options;
  };
  const onInputChange = (event) => {
    // if (event.target.value.length > 2) {
    onChange(event.target.value);

    //   setAutocomplete(true);
    // } else {
    //   setAutocomplete(false);
    // }
  };
  const onClickItem = (value) => {
    if (value && "_id" in value) {
      console.log("value", value._id.split("_"));
      const _id = value._id.split("_")[0];
      addClass(_id);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: "2px", marginBottom: "10px" }}>
      <AppBar position="static" sx={{ padding: 0 }} style={{ padding: 0 }}>
        <Toolbar sx={{ margin: 0 }} style={{ padding: "16px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              // disableClearable
              // open={autocomplete}
              options={get_also_alternatives(options)}
              filterOptions={(options, state) => options}
              onInputChange={onInputChange}
              onChange={(e, value) => onClickItem(value)}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <StyledInputBase
                  ref={params.InputProps.ref}
                  placeholder="Search…"
                  inputProps={{
                    "aria-label": "search",
                    ...params.inputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
