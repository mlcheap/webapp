import { server_address } from "./consts";

export async function loginUser(credentials) {
  return fetch(server_address + "/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    });
  });
}

export async function signupUser(credentials) {
  return fetch(server_address + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    });
  });
}
