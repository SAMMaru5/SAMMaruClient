import axios from "axios";
import {getCookie} from "../hooks/useCookie";

const cookie = getCookie('SammaruAccessToken');

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Authorization': `Bearer ${cookie}`,
    },
});

instance.interceptors.request.use(
    async function (config) {
        const currentTime = new Date();
        if(sessionStorage.getItem("EXPIRED_TIME")){
            const expiredTime = new Date(
                sessionStorage.getItem("EXPIRED_TIME").toString().substring(0, 19)
            );

            if (expiredTime.getTime() - currentTime.getTime() <= 300000) {
                await axios
                    .post(process.env.REACT_APP_URL + "/auth/reissue", {},{withCredentials: true})
                    .then((res) => console.log(res));
            }

        }



        return config;
    }
);


instance.interceptors.response.use(
    (response) => {
        return response;
    }
);

export default instance;