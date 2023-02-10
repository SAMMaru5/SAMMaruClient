import axios from "axios";
import { signout } from "../hooks/useAuth";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

instance.interceptors.request.use(async function (config) {
  const currentTime = new Date().getTime();
  const accessToken = localStorage.getItem("sm-accessToken");
  const refreshToken = localStorage.getItem("sm-refreshToken");

  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };

  if (localStorage.getItem("sm-expired")) {
    const expiredTime = new Date(
      localStorage.getItem("sm-expired").toString().substring(0, 19)
    ).getTime();

    // 만료 시간 이후에 API의 호출이 일어난 경우 로컬 스토리지 초기화
    if (expiredTime < currentTime) {
      localStorage.clear();
      return config;
    }

    // 만료 시간 2분 내에 API의 호출이 일어나면 리이슈 요청
    if (expiredTime - currentTime <= 120000) {
      await axios
        .post(process.env.REACT_APP_URL + "/auth/reissue", {
          accessToken,
          refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem(
              "sm-accessToken",
              res.data.response.accessToken
            );
            localStorage.setItem(
              "sm-refreshToken",
              res.data.response.refreshToken
            );
            localStorage.setItem(
              "sm-expired",
              res.data.response.accessTokenExpiresTime
            );
          }
        });
    }
  }

  return config;
});

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;
