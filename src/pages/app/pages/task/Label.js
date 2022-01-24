import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Done";
import InfoIcon from "@mui/icons-material/Info";

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
  const handleDelete = (index) => (event) => {
    setSelectItem(index);
    handleChange(index);
  };
  const getTitle = (predicted_label) => {
    return (
      <div>
        <div>
          <strong>{getNameLabel(predicted_label)}</strong>
        </div>
        <div>
          <Divider sx={{ borderBlockColor: "white", margin: "2px" }} />

          <strong style={{ fontSize: 11 }}>
            {getAlternates(predicted_label).join("/")}
          </strong>
        </div>
        <Divider sx={{ borderBlockColor: "white", margin: "2px" }} />

        <div>
          <span>{getDescription(predicted_label)}</span>
        </div>
      </div>
    );
  };
  const click_label = (index) => (e) => {
    setSelectItem(index);
    handleChange(index);
  };
  const getNameLabel = (predicted_label) => {
    let name = predicted_label["name"];
    if (predicted_label["search_name"]) {
      name = predicted_label["search_name"];
    }

    return name;
  };

  const getAlternates = (predicted_label) => {
    let alters = predicted_label["alternates"];
    let name = getNameLabel(predicted_label);

    if (typeof alters === "string" || alters instanceof String) {
      alters = alters ? alters.slice(1, -1).trim().split(",") : [];
    }
    if (predicted_label["search_name"]) {
      alters[alters.indexOf(name)] = predicted_label["name"];
    }
    return alters;
  };
  const getLabel = (predicted_label) => {
    let name = getNameLabel(predicted_label);
    let alters = getAlternates(predicted_label);
    return (
      <Box>
        <Typography style={{ whiteSpace: "normal" }}>
          <strong>{name}</strong>
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          style={{ whiteSpace: "normal" }}
        >
          {alters ? alters.join("/") : ""}
        </Typography>
      </Box>
    );
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
          <Box key={index}>
            {checked[index] ? (
              <Chip
                icon={
                  <JobTooltip
                    title={getTitle(predicted_label)}
                    key={index}
                    onOpen={onDescription(index)}
                  >
                    <InfoIcon fontSize="small" />
                  </JobTooltip>
                }
                sx={{ margin: "5px" }}
                style={{ height: "100%" }}
                variant="outlined"
                deleteIcon={<AddIcon />}
                label={getLabel(predicted_label)}
                onClick={click_label(index)}
                color="success"
                onDelete={handleDelete(index)}
              />
            ) : (
              <Chip
                icon={
                  <JobTooltip
                    title={getTitle(predicted_label)}
                    key={index}
                    onOpen={onDescription(index)}
                  >
                    <InfoIcon fontSize="small" />
                  </JobTooltip>
                }
                sx={{ margin: "5px" }}
                style={{ height: "100%" }}
                label={getLabel(predicted_label)}
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
