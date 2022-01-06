import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { json_obj } from "./sample";
import SearchBox from "./SearchBox";
import Labels from "./Label";
import { useNavigate } from "react-router-dom";
import { userInfo } from "./../../../../services/userInfo";
import CircularProgress from "@mui/material/CircularProgress";

import {
  getAllClassesApi,
  aiApi,
  classApi,
  newTaskApi,
  submitApi,
} from "./../../../../services/label_api";

import Api from "./../../../../services/api";

const TaskPage = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  let [checked, setChecked] = useState({});
  let [options, setOptions] = useState([]);
  let [preferedClasses, setPreferedClasses] = useState([]);
  let [allClasses, setAllClasses] = useState();
  const user = userInfo();
  let [task, setTask] = useState();
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
    setPreferedClasses([]);
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
        if (new_task) {
          update_tags(new_task[0], classes);
        }
      });
    }
    newTaskApi(user, project_id).then((res) => {
      console.log("new task");
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
    if (task && classes) {
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
    // console.log("index", index);
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
  let onClickSubmit = (event) => {
    let selectedLabels = [];
    for (let id = 0; id < preferedClasses.length; id++) {
      if (checked[id]) {
        selectedLabels.push(preferedClasses[id]);
      }
    }

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
        setNewTask(res["data"]["tasks"]);
        setChecked({});
      });
    }
  };
  return (
    <Box>
      <Box align="center" justify="center" alignItems="center">
        <SearchBox options={options} addClass={addClass} />
      </Box>
      <Grid container spacing={2} sx={{ padding: "1vh" }}>
        <Grid item md={9} xs={12}>
          <Box sx={{ padding: "10px" }}>
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
    </Box>
  );
};
export default TaskPage;
