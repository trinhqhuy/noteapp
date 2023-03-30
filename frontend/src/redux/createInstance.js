import axios from "axios";
import jwtdecode from "jwt-decode";
import { loginSuccess } from "./authSlice";
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000",
});
const refreshToken = async () => {
  try {
    const res = await instance.post("/v1/auth/refresh/", "abc");
    return res.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
export const createAxios = (user, dispatch, stateSuccess) => {
  // console.log(user)
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtdecode(user?.accessToken);
      // console.log(date.getTime() / 1000);
      // console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );
  return newInstance;
};
