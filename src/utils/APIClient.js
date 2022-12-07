import axios from "axios"
import env from "./env"

const instance = axios.create({
  baseURL: env.API_URL,
  timeout: env.TIMEOUT,
});

console.log(instance.baseURL)

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
