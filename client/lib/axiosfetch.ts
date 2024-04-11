import axios from "axios";
const axiosFetch = axios.create({
  baseURL: process.env.backendUrl,
  timeout: 8000,
});

const axiosFetchAuth = (token: string) =>
  axios.create({
    baseURL: process.env.backendUrl + "/auth",
    headers: {
      Authorization: `${token}`,
    },
  });
export { axiosFetch, axiosFetchAuth };
