import axios from "axios";
import { getCookie } from "../hooks/useCookie";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

instance.interceptors.request.use(async function (config) {
  const currentTime = new Date();
  const cookie = getCookie("SammaruAccessToken");

  config.headers = {
    Authorization: `Bearer ${cookie}`,
    Accept: "application/json",
  };

  // console.log("interceptor function::::: " + cookie);

  if (sessionStorage.getItem("EXPIRED_TIME") && cookie) {
    // console.log("api function::::: " + getCookie("SammaruAccessToken"));
    const expiredTime = new Date(
      sessionStorage.getItem("EXPIRED_TIME").toString().substring(0, 19)
    );
    sessionStorage.removeItem("EXPIRED_TIME");
    // console.log(sessionStorage.getItem("EXPIRED_TIME"));

    if (expiredTime.getTime() - currentTime.getTime() <= 300000) {
      await axios
        .post(
          process.env.REACT_APP_URL + "/auth/reissue",
          {},
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res);
        });
    }
  }

  return config;
});

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;
