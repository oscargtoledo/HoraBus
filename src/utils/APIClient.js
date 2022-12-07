import axios from "axios"
// import env from "./env"

const instance = axios.create({
  baseURL: "https://horabus-api.onrender.com",
  timeout: 10000,
});

console.log(instance.baseURL)

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
