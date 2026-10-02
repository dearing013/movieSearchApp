// import axiosInstance from "./axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setState, useEffect } from "react"
import { logout } from "./components/Stores/authSlice";
import { openModal } from "./components/Stores/modalSlice";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

// 1. Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const useAxiosInterceptors = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

 
  useEffect(() => {

    
    // 2. Add the request interceptor
    axiosInstance.interceptors.request.use(
    (config) => {
        // Fetch the token from your storage (localStorage, cookies, or state)
        const token = localStorage.getItem('authToken');
        
        if (token) {
        // Attach the token to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
    );

    const interceptor = axiosInstance.interceptors.response.use(
      (response) => 
      response,
      async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest.retry) {
            console.log("TOKENEXPIRED")
            originalRequest.retry = true
            try {
                const response =  await axios.post(`${API_URL}/movieSearch/users/refresh?refresh_token=${localStorage.refresh_token}`); 
                const accessToken = response.data["access_token"]
                const newRefreshToken = response.data["refresh_token"]

                // Store the new access and refresh tokens.
                localStorage.setItem('authToken', accessToken);
                localStorage.setItem('refresh_token', newRefreshToken);

                // Update the authorization header with the new access token.
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest); // Retry the original request with the new access token.
                // Logic for logout or token refresh
            }
            catch (refreshError) {
                // setState(state => ({ ...state,isLoggedIn: false}));
                dispatch(logout());
                dispatch(openModal({description: "Refresh Token failed. logging out...", color: "red"}))
                localStorage.setItem("loggedIn",false)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refresh_token');
                navigate("/")
                return Promise.resolve({ data: null });
            }
        }
          return Promise.reject(error);
      })
    // Clean up interceptor on unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [navigate]);
};