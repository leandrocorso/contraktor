import axios from 'axios';

import { BASE_URL } from '../utils/constants';

class Api {
  static get(uri, params = {}) {
    return axios.get(`${BASE_URL}${uri}`, {
      params: { ...params },
    });
  }

  static post(uri, params) {
    return axios.post(`${BASE_URL}${uri}`, {
      params: { ...params },
    });
  }

  static put(uri, params) {
    return axios.put(`${BASE_URL}${uri}`, {
      params: { ...params },
    });
  }

  static delete(uri, params) {
    return axios.delete(`${BASE_URL}${uri}`, {
      params: { ...params },
    });
  }
}

export default Api;
