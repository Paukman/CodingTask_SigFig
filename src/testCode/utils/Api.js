import axios from "axios";

class Api {
  intercept401ApiResponse = (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.config?.url.startsWith("/api")
    ) {
      window.location = `${window.location.origin}/expired`;
    }
    return Promise.reject(error);
  };

  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      this.intercept401ApiResponse
    );
  }

  async request(config) {
    return axios.request(config);
  }

  async get(url, config) {
    return axios.get(url, config);
  }

  async delete(url, config) {
    return axios.delete(url, config);
  }

  async deleteWithData(url, data, config) {
    return axios.delete(url, { ...config, data });
  }

  async head(url, config) {
    return axios.head(url, config);
  }

  async options(url, config) {
    return axios.options(url, config);
  }

  async post(url, data, config) {
    return axios.post(url, data, config);
  }

  async put(url, data, config) {
    return axios.put(url, data, config);
  }

  async patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  async getUri(config) {
    return axios.getUri(config);
  }
}

const api = new Api();
export default api;
