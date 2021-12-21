import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";

import { JobTooltip } from "./JobToolTip";
const Labels = ({ predicted_labels, setSelectItem, selectItem }) => {
  const handleChange = (index) => {
    setChecked((prevState) => ({
      ...prevState,
      [index]: !checked[index],
    }));
  };
  // const handleMouseOver = (index) => (event) => {
  //   setSelectItem(index);
  //   setOpen(true);
  // };
  const handleDelete = (index) => (event) => {
    setSelectItem(index);
    handleChange(index);
  };
  let [checked, setChecked] = useState({});
  // let [open, setOpen] = useState(false);

  const click_label = (index) => (e) => {
    // console.log("clicked", index);

    setSelectItem(index);
    handleChange(index);
  };

  return (
    <Box>
      {predicted_labels.map((predicted_label, index) => (
        <JobTooltip title={predicted_labels[selectItem]["text"]} key={index}>
          {checked[index] ? (
            <Chip
              sx={{ margin: "5px" }}
              label={predicted_label["label"]}
              variant="outlined"
              onClick={click_label(index)}
              color="success"
              onDelete={handleDelete(index)}
            />
          ) : (
            <Chip
              sx={{ margin: "5px" }}
              label={predicted_label["label"]}
              variant="outlined"
              deleteIcon={<DoneIcon />}
              onDelete={handleDelete(index)}
              onClick={click_label(index)}
            />
          )}
        </JobTooltip>
      ))}
      <Divider sx={{ margin: "20px 0 " }} />
      <Box
        sx={{
          mx: "auto",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginRight: "10px", marginLeft: "20px" }}
        >
          more
        </Button>
        <Button variant="contained" sx={{ marginLeft: "10px" }}>
          submit
        </Button>
      </Box>
    </Box>
  );
};
export default Labels;
