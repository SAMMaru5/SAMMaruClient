import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

instance.interceptors.request.use(async function (config) {
  const currentTime = new Date();
  const accessToken = localStorage.getItem("sm-accessToken");
  const refreshToken = localStorage.getItem("sm-refreshToken");

  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };

  if (localStorage.getItem("sm-expired")) {
    const expiredTime = new Date(
        localStorage.getItem("sm-expired").toString().substring(0, 19)
    );

    if (expiredTime.getTime() - currentTime.getTime() <= 300000) {
      await axios
        .post(
          process.env.REACT_APP_URL + "/auth/reissue",
          {accessToken, refreshToken}
        )
        .then((res) => {
          if(res.status === 200){
            localStorage.setItem('sm-accessToken', res.data.response.accessToken);
            localStorage.setItem('sm-refreshToken', res.data.response.refreshToken);
            localStorage.setItem('sm-expired', res.data.response.accessTokenExpiresTime);
          }
        });
    }
  }

  return config;
});

instance.interceptors.response.use(
    (response) => {
      return response;
    },
);


export default instance;
