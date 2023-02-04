import axios from "axios";
import jwtdecode from "jwt-decode";
import { loginSuccess } from "./authSlice";

const refreshToken = async() => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh/",'abc', {
        withCredentials: true
      })
      return res.data
    }catch(err) {
      console.log(err.response.data);
    }
  }
export const createAxios = (user, dispatch, stateSuccess) => {
  // console.log(user)
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
      async(config) => {
        let date = new Date()
        const decodedToken = jwtdecode(user?.accessToken)
        // console.log(date.getTime() /1000);
        // console.log(decodedToken);
        if(decodedToken.exp < date.getTime() /1000) {
          const data = await refreshToken();
          const refreshUser = {
            ...user,
            accessToken: data.accessToken,

          }
          dispatch(stateSuccess(refreshUser))
          config.headers["token"] = "Bearer " + data.accessToken
        }
        return config;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err)
      }
    )
      return newInstance
}