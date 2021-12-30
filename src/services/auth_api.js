import { server_address } from "./consts";

export async function loginUser(credentials) {
  return fetch("/api/v5/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function signupUser(credentials) {
  return fetch("/api/v5/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
