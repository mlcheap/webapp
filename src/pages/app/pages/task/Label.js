import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Done";
import InfoIcon from "@mui/icons-material/Info";

import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";

import { JobTooltip } from "./JobToolTip";
const Labels = ({
  predicted_labels,
  setSelectItem,
  selectItem,
  clickMore,
  clickSubmit,
  clickSkipped,
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
      {predicted_labels.map((predicted_label, index) =>
        predicted_label && "name" in predicted_label ? (
          <Box>
            {checked[index] ? (
              <Chip
                icon={
                  <InfoIcon fontSize="small" />
                  //   <JobTooltip
                  //   title={getDescription(predicted_labels[index])}
                  //   key={index}
                  //   onOpen={onDescription(index)}
                  // >

                  // </JobTooltip>
                }
                sx={{ margin: "5px" }}
                label={
                  <Typography style={{ whiteSpace: "normal" }}>
                    {predicted_label["name"]}
                  </Typography>
                }
                style={{ height: "100%" }}
                variant="outlined"
                deleteIcon={<AddIcon />}
                // deleteIcon={<RemoveIcon />}
                onClick={click_label(index)}
                color="success"
                onDelete={handleDelete(index)}
              />
            ) : (
              <Chip
                icon={
                  <JobTooltip
                    title={getDescription(predicted_labels[index])}
                    key={index}
                    onOpen={onDescription(index)}
                  >
                    <InfoIcon fontSize="small" />
                  </JobTooltip>
                }
                sx={{ margin: "5px" }}
                style={{ height: "100%" }}
                label={
                  <Typography style={{ whiteSpace: "normal" }}>
                    {predicted_label["name"]}
                  </Typography>
                }
                variant="outlined"
                // onDelete={handleDelete(index)}
                onClick={click_label(index)}
              />
            )}
          </Box>
        ) : (
          ""
        )
      )}
      <Divider sx={{ margin: "20px 0 " }} />
      <Box
        sx={{
          mx: "auto",
          width: "100%",
        }}
      >
        <Button
          onClick={clickSkipped}
          sx={{ marginLeft: "10px", color: "#b2a429" }}
        >
          skip
        </Button>

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
