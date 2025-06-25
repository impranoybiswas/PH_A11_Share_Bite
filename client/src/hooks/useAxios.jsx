import axios from "axios";
import { useContext } from "react";
import { FirebaseContext } from "../providers/Context";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export default function useAxios() {
  const { user } = useContext(FirebaseContext);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });
  return axiosInstance;
}
