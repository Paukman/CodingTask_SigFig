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
    await this.isAuthenticated();
    return axios.request(config);
  }

  async get(url, config) {
    return axios.get(url, config);
  }

  async delete(url, config) {
    await this.isAuthenticated();
    return axios.delete(url, config);
  }

  async deleteWithData(url, data, config) {
    await this.isAuthenticated();
    return axios.delete(url, { ...config, data });
  }

  async head(url, config) {
    await this.isAuthenticated();
    return axios.head(url, config);
  }

  async options(url, config) {
    await this.isAuthenticated();
    return axios.options(url, config);
  }

  async post(url, data, config) {
    await this.isAuthenticated();
    return axios.post(url, data, config);
  }

  async put(url, data, config) {
    await this.isAuthenticated();
    return axios.put(url, data, config);
  }

  async patch(url, data, config) {
    await this.isAuthenticated();
    return axios.patch(url, data, config);
  }

  async getUri(config) {
    await this.isAuthenticated();
    return axios.getUri(config);
  }
}

const api = new Api();
export default api;
