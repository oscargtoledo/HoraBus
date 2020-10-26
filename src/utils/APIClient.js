import axios from 'axios';

const API_URL = process.env.API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 4000,
});

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
}