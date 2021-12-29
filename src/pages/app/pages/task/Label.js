import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";

import { JobTooltip } from "./JobToolTip";
const Labels = ({
  predicted_labels,
  setSelectItem,
  selectItem,
  clickMore,
  clickSubmit,
  checked,
  setChecked,
  onDescription,
}) => {
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
  // let [open, setOpen] = useState(false);
  const click_label = (index) => (e) => {
    // console.log("clicked", index);

    setSelectItem(index);
    handleChange(index);
  };
  const getDescription = (preferClass) => {
    if (preferClass && preferClass["metadata"]) {
      return preferClass["metadata"]["description"];
    } else {
      return "";
    }
  };
  return (
    <Box>
      {predicted_labels.map((predicted_label, index) => (
        <JobTooltip
          title={getDescription(predicted_labels[index])}
          key={index}
          onOpen={onDescription(index)}
        >
          {checked[index] ? (
            <Chip
              sx={{ margin: "5px" }}
              label={predicted_label["name"]}
              variant="outlined"
              onClick={click_label(index)}
              color="success"
              onDelete={handleDelete(index)}
            />
          ) : (
            <Chip
              sx={{ margin: "5px" }}
              label={predicted_label["name"]}
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
          onClick={clickMore}
          variant="contained"
          sx={{ marginRight: "10px", marginLeft: "20px" }}
        >
          more
        </Button>
        <Button
          onClick={clickSubmit}
          variant="contained"
          sx={{ marginLeft: "10px" }}
        >
          submit
        </Button>
      </Box>
    </Box>
  );
};
export default Labels;
