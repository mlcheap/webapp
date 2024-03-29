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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default function SearchAppBar({ onChange, options, addClass }) {
  // let [autocomplete, setAutocomplete] = useState(false);
  const get_also_alternatives = (options) => {
    let all_options = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      all_options.push({ name: option.name, _id: option._id });
      let alternates = option.alternates;
      if (typeof alternates === "string" || alternates instanceof String) {
        alternates = alternates.slice(1, -1).trim().split(",");
        alternates = alternates.map((alternate) =>
          alternate.trim().slice(1, -1)
        );
      }

      for (let j = 0; j < alternates.length; j++) {
        let altername = alternates[j];

        all_options.push({
          name: altername,
          _id: option._id + "_" + j,
        });
      }
    }

    return all_options;
  };
  const onInputChange = (event) => {
    onChange(event.target.value);
  };
  const onClickItem = (value) => {
    if (value && "_id" in value) {
      const _id = value._id.split("_")[0];
      addClass(value.name, _id);
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
              sx={{ width: "100%" }}
              freeSolo
              id="free-solo-2-demo"
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
                  style={{ width: "100%" }}
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
