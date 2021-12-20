import React, { useState, useEffect } from "react";
import { initialApi } from "./../../../../services/init_api";
import { userInfo } from "./../../../../services/userInfo";
import ProjectCard from "./../../../../components/ProjectCard";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function InitialPage() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const user = userInfo();
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      const response = await initialApi(user);
      setProjects(response.data.projects, setLoading(false));
    }
    fetchMyAPI();
  }, []);
  const startProject = (project) => (e) => {
    e.preventDefault();
    navigate(`/app/new-task?project_id=${project.project_id}`);

    console.log("start project", project.project_name);
  };
  return (
    <Grid container spacing={2} style={{ padding: 12 }}>
      {projects.map((project) => (
        <Grid
          item
          xs={12}
          md={3}
          direction="column"
          lg={2}
          xl={1}
          alignItems="center"
          justifyContent="center"
        >
          <ProjectCard project={project} startProject={startProject} />
        </Grid>
      ))}
    </Grid>
  );
}
