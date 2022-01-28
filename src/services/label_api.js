import { server_address } from "./consts";

export function getAllClassesApi(user, project_id) {
  const api_token = user.access_token;
  var myHeaders = new Headers({
    // Accept: "application/json",
    // "Content-Type": "application/json",
  });

  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    server_address + "/classes?lang=en&project_id=" + project_id,
    requestOptions
  )
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}

export function aiApi(user, body) {
  const api_token = user.access_token;
  var myHeaders = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  requestOptions.body = JSON.stringify(body);

  return fetch(server_address + "/ai", requestOptions)
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}

export function classApi(user, project_id, class_id) {
  const api_token = user.access_token;
  var myHeaders = new Headers({});

  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    server_address +
      "/class?lang=en&class_id=" +
      class_id +
      "&project_id=" +
      project_id,
    requestOptions
  )
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}
export function newTaskApi(user, project_id) {
  const api_token = user.access_token;
  var myHeaders = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    server_address +
      "/label/new-item?lang=en&project_id=" +
      project_id +
      "&buffer_ids=[]&skiped_ids=[]",
    requestOptions
  )
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}

export function submitApi(user, body) {
  const api_token = user.access_token;
  var myHeaders = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  requestOptions.body = JSON.stringify(body);

  return fetch(server_address + "/label/label-task", requestOptions)
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}
export function getProjectApi(user, project_id) {
  const api_token = user.access_token;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    server_address + "/label/project?lang=en&project_id=" + project_id,
    requestOptions
  )
    .catch((error) => console.log("error", error))
    .then((response) => response.json());
}
