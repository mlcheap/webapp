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
  getProjectApi,
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
  let [_project, setProject] = useState({ metadate: { lang: "en" } });
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
    getProjectApi(user, project_id).then((data) => {
      setProject(data["data"]["project"]);
      console.log(data["data"]["project"]);
    });
    setLoading(true);

    if (!allClasses) {
      getAllClassesApi(user, project_id).then((data) => {
        classes = data["data"]["classes"];
        setAllClasses(classes);
        // setOptions(classes);
        update_tags(new_task[0], [], classes);
      });
    }
    newTaskApi(user, project_id).then((res) => {
      new_task = res["data"]["tasks"];
      prepareTask(res, classes);
    });
    setLoading(false);
  }, []);

  const addClass = (name, _id) => {
    let _class = findClassByIndex(allClasses, _id);
    _class["search_name"] = name;
    _class["agent"] = "labeler";
    setPreferedClasses((oldClasses) =>
      !oldClasses.some((item) => item._id === _id)
        ? [...oldClasses, _class]
        : oldClasses
    );
    const idx = preferedClasses.length;
    setChecked((prevState) => ({
      ...prevState,
      [idx]: true,
    }));
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
    if (allClasses) {
      const obj = allClasses.find((c) => c._id === String(index));
      return obj;
    }
    return undefined;
  };

  let onDescription = (index) => (event) => {
    classApi(user, project_id, preferedClasses[index]["_id"]).then((res) => {
      let newArr = [...preferedClasses];
      newArr[index]["metadata"] = res["data"]["metadata"];
      setPreferedClasses(newArr);
    });
  };
  let onClickMore = (event) => {
    update_tags(task, preferedClasses, allClasses);
  };
  let onChangeSearch = (search) => {
    console.log(preferedClasses.map((item) => item._id));
    if (search.length < 3) {
      setOptions([]);
    } else {
      aiApi(user, {
        title: search,
        description: search,
        project_id: project_id,
        task_id: task["task_id"],
        exclude_indices: preferedClasses.map((item) => item._id),
      }).then((res) => {
        let ops = res["data"]["labels"].map((item) =>
          findClassByIndex(allClasses, item.index)
        );
        ops = ops.filter(function (element) {
          return element !== undefined;
        });

        // console.log(ops);
        // console.log("search change", ops);
        setOptions(ops);
      });
    }
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
        submitApi(user, {
          project_id: project_id,
          task: {
            task_id: task["task_id"],
            labels: selectedLabels,
            label_time: Date().toLocaleString(),
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
            total_skipped={meta ? meta["total_skipped"] : 0}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Box sx={{ padding: "2px" }}>
            <Paper sx={{ minHeight: "calc( 100vh - 240px) ", padding: "20px" }}>
              <div
                dir={
                  _project.metadata && _project.metadata.lang == "ar"
                    ? "rtl"
                    : "ltr"
                }
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  textAlign={"justify"}
                  component="div"
                >
                  {!task ? "" : task["items"][0]["data"]["title"]}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  textAlign={"justify"}
                  component="div"
                >
                  {!task ? "" : task["items"][0]["data"]["description"]}
                </Typography>
              </div>
            </Paper>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box align="center" justify="center" alignItems="center">
            {/* <div
              dir={
                _project.metadata && _project.metadata.lang == "ar"
                  ? "rtl"
                  : "ltr"
              }
            > */}
            <SearchBox
              onChange={onChangeSearch}
              options={options}
              addClass={addClass}
            />
            {/* </div> */}
          </Box>
          <div
            dir={
              _project.metadata && _project.metadata.lang == "ar"
                ? "rtl"
                : "ltr"
            }
          >
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
          </div>
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
