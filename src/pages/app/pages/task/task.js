import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import { json_obj } from "./sample";
import SearchBox from "./SearchBox";
import Labels from "./Label";
import { useNavigate } from "react-router-dom";
import { userInfo } from "./../../../../services/userInfo";
// import CircularProgress from "@mui/material/CircularProgress";
import StatBar from "./StatBoard";
import {
  getAllClassesApi,
  aiApi,
  classApi,
  newTaskApi,
  submitApi,
} from "./../../../../services/label_api";

import Api from "./../../../../services/api";
import { Alert, Snackbar } from "@mui/material";

const TaskPage = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  let [checked, setChecked] = useState({});
  let [options, setOptions] = useState([]);
  let [preferedClasses, setPreferedClasses] = useState([]);
  let [allClasses, setAllClasses] = useState();
  const user = userInfo();
  let [task, setTask] = useState();
  let [meta, setMeta] = useState();

  let [selectItem, setSelectItem] = useState(0);
  let project_id = searchParams.get("project_id");

  const setNewTask = (newTasks) => {
    if (newTasks && newTasks.length > 0) {
      const newTask = newTasks[0];
      setTask(newTask);
    } else {
      navigate("/app/initial");
    }
  };
  const prepareTask = (res, classes) => {
    let new_task = res["data"]["tasks"];
    setNewTask(new_task);
    setMeta(res["meta"]);
    update_tags(new_task[0], [], classes);
    setChecked({});
  };
  useEffect(() => {
    let classes = null;
    let new_task = [];
    setLoading(true);
    if (!allClasses) {
      getAllClassesApi(user, project_id).then((data) => {
        classes = data["data"]["classes"];
        setAllClasses(classes);
        setOptions(classes);
        update_tags(new_task[0], [], classes);
      });
    }
    newTaskApi(user, project_id).then((res) => {
      new_task = res["data"]["tasks"];
      prepareTask(res, classes);
    });
    setLoading(false);
  }, []);

  const addClass = (_class) => {
    _class["agent"] = "labeler";
    setPreferedClasses((oldClasses) =>
      oldClasses.indexOf(_class) === -1 ? [...oldClasses, _class] : oldClasses
    );
  };
  const update_tags = (task, prClasses, classes) => {
    if (task) {
      const ai_predicteds = task["items"][1]["meta-label"]["ai"];
      let new_tags = [];
      for (let i = 0; i < ai_predicteds.length; i++) {
        let tag = findClassByIndex(classes, ai_predicteds[i].index);
        if (
          !prClasses.some((pr) => pr["_id"] === tag["_id"]) &&
          new_tags.length < 5
        ) {
          new_tags.push(tag);
        }
      }
      setPreferedClasses(prClasses.concat(new_tags));
    }
  };

  const findClassByIndex = (allClasses, index) => {
    const obj = allClasses.find((c) => c._id === String(index));
    return obj;
  };

  let onDescription = (index) => (event) => {
    classApi(user, project_id, preferedClasses[index]["_id"]).then((res) => {
      let newArr = [...preferedClasses];
      newArr[index] = res["data"];
      setPreferedClasses(newArr);
    });
  };
  let onClickMore = (event) => {
    update_tags(task, preferedClasses, allClasses);
  };
  let onChangeSearch = (search) => {
    // console.log(search);
    aiApi(user, {
      title: search,
      description: search,
      project_id: project_id,
      task_id: task["task_id"],
      excludes: [],
    }).then((res) => {
      // console.log("options", options);
      // console.log("search change", res);
      let ops = res["data"]["labels"].map((item) =>
        findClassByIndex(allClasses, item.index)
      );
      // console.log("search change", ops);
      setOptions(ops);
    });
  };
  let onClickSubmit = (event) => {
    let selectedLabels = [];
    for (let id = 0; id < preferedClasses.length; id++) {
      if (checked[id]) {
        selectedLabels.push(preferedClasses[id]);
      }
    }
    if (selectedLabels.length === 0) {
      setOpenSnackBar(true);
    } else {
      if (task && project_id) {
        let label_time = 8347;
        submitApi(user, {
          project_id: project_id,
          task: {
            task_id: task["task_id"],
            labels: selectedLabels.map((label) => ({
              _id: label["_id"],
              name: label["name"],
            })),
            label_time: label_time,
          },
          buffer_ids: [],
          skiped_ids: [],
        }).then((res) => {
          prepareTask(res, allClasses);
        });
      }
    }
  };
  let onClickSkipped = (event) => {
    if (task && project_id) {
      submitApi(user, {
        project_id: project_id,
        task: {
          task_id: task["task_id"],
          labels: [],
          label_time: 884,
        },
        buffer_ids: [],
        skiped_ids: [task["task_id"]],
      }).then((res) => {
        prepareTask(res, allClasses);
      });
    }
  };
  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: "1vh" }}>
        <Grid item sm={12} textAlign="center">
          <StatBar
            centered
            total_labeled={meta ? meta["total_labeled"] : 0}
            total_remain={meta ? meta["total_remain"] : 0}
          />
        </Grid>
        <Grid item md={9} xs={12}>
          <Box sx={{ padding: "2px" }}>
            <Paper sx={{ minHeight: "calc( 100vh - 240px) ", padding: "20px" }}>
              <Typography
                variant="h4"
                gutterBottom
                textAlign={("justify", "left")}
                component="div"
              >
                {!task ? "" : task["items"][0]["data"]["title"]}
              </Typography>

              <Typography
                variant="body1"
                gutterBottom
                textAlign={("justify", "left")}
                component="div"
              >
                {!task ? "" : task["items"][0]["data"]["description"]}
              </Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box align="center" justify="center" alignItems="center">
            <SearchBox
              onChange={onChangeSearch}
              options={options}
              addClass={addClass}
            />
          </Box>

          <Labels
            predicted_labels={preferedClasses}
            setSelectItem={setSelectItem}
            selectItem={selectItem}
            clickMore={onClickMore}
            clickSubmit={onClickSubmit}
            clickSkipped={onClickSkipped}
            checked={checked}
            setChecked={setChecked}
            onDescription={onDescription}
          />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackBar(false)}
        >
          {"you can't submit empty list"}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default TaskPage;
