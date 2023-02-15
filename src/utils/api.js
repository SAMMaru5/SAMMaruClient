import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

instance.interceptors.request.use(async function (config) {
  const accessToken = localStorage.getItem("sm-accessToken");
  const currentTime = new Date().getTime();

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
        .post(
          process.env.REACT_APP_URL + "/auth/reissue",
          { accessToken },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "sm-accessToken",
              response.data.response.accessToken
            );
            localStorage.setItem(
              "sm-expired",
              response.data.response.accessTokenExpiresTime
            );
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              window.location.reload();
              break;
            default:
              Swal.fire({
                icon: "error",
                title: "예기치 못 한 에러가 발생하였습니다.",
              });
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
