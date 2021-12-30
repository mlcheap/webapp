import React, { useState, useEffect } from "react";
import { initialApi } from "../../../../services/init_api";
import { userInfo } from "../../../../services/userInfo";
import ProjectCard from "../../../../components/ProjectCard";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const user = userInfo();
  return <Grid container spacing={2} style={{ padding: 12 }}></Grid>;
}
