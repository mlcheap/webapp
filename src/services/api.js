import * as axios from "axios";
// import { getCookie } from "./utils.js";
import { userInfo } from "./userInfo";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://localhost:3000/api/v5";
  }

  init = () => {
    const user = userInfo();

    this.api_token = user.access_token;

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  init_api = (params = { lang: "fa" }) => {
    return this.init().get("/init", { params: params });
  };

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };
  getAllClassesApi = (project_id) => {
    return this.init().get("/classes", { params: { project_id, lang: "en" } });
  };
}
