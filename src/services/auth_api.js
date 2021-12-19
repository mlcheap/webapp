import { server_address } from "./utils";

export async function loginUser(credentials) {
  return fetch(server_address + "/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function signupUser(credentials) {
  return fetch(server_address + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
