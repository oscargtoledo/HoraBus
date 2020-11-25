import axios from 'axios';

import env from './env';

const instance = axios.create({
  baseURL: env.API_URL,
  timeout: 4000,
});

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
