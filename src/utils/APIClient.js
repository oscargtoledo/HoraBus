import { create } from 'axios';

import env from './env';

const instance = create({
  baseURL: env.API_URL,
  // baseURL: 'https://buschedule-api.herokuapp.com',
  timeout: env.TIMEOUT,
});

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
