import { axiosInstance } from "../../customAxiosInterceptor";

// A single, unified wrapper for all HTTP methods
export const api = {
  // Handles all GET requests
  get: async (url, config = {}) => {
    const response = await axiosInstance.get(url, config);
    return response.data;
  },

  // Handles all POST requests
  post: async (url, data, config = {}) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    const response = await axiosInstance.post(url, data, config)
    return response.data
  },


  // Handles all PUT requests
  put: async (url, data, config = {}) => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  },

  // Handles all DELETE requests
  delete: async (url, config = {}) => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  },
};