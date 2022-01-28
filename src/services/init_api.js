import { server_address } from "./consts";

export function initialApi(user) {
  const api_token = user.access_token;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + api_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(server_address + "/init?lang=fa", requestOptions)
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
