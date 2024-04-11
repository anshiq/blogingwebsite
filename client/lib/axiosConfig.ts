import axios from "axios";
const axiosFetch = axios.create({
  baseURL: process.env.backendUrl,
  // baseURL: "http://localhost:8080/user",
  // baseURL: "http://localhost:8080",
  timeout: 8000,
});

const axiosFetchUser = (token: string) =>
  axios.create({
    baseURL: process.env.backendUrl + "/authedAdmin",
    headers: {
      Authorization: `${token}`,
    },
  });
const axiosFetchAdmin = (token: string) =>
  axios.create({
    baseURL: process.env.backendUrl + "/authedAdmin",
    headers: {
      Authorization: `${token}`,
    },
  });
export { axiosFetch, axiosFetchUser, axiosFetchAdmin };
