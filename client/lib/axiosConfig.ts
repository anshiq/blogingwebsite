import axios from "axios";
const axiosFetch = axios.create({
  baseURL: process.env.backendUrl + "/user",
  timeout: 8000,
});

const axiosFetchUser = (token: string) =>
  axios.create({
    baseURL: process.env.backendUrl + "/authedUser",
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
