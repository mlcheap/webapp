import { server_address } from "./utils";

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
