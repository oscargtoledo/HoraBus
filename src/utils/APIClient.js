import { create } from 'axios';

import env from './env';

const instance = create({
  baseURL: env.API_URL,
  // baseURL: 'https://buschedule-api.herokuapp.com',
  timeout: 4000,
});

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
