import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_URL,
});

instance.interceptors.request.use(
    async function (config) {
        const currentTime = new Date();
        const expiredTime = new Date(
            sessionStorage.getItem("EXPIRED_TIME").toString().substring(0, 19)
        );

        console.log("current ::::", currentTime);
        console.log("expired ::::", expiredTime);

        console.log("차이: ", expiredTime.getTime() - currentTime.getTime());

        if (expiredTime.getTime() - currentTime.getTime() <= 300000) {
            console.log("이게 되네?");

            await axios
                .post(process.env.REACT_APP_URL + "/auth/reissue", {},{withCredentials: true})
                .then((res) => console.log(res));
        }

        return config;
    }
    // async (err) => {
    //     if (err.response) {
    //         if(err.response.status === 401){
    //             console.log('accesstoken 만료');
    //             try {
    //                 return await axios.post('http://localhost:8080/auth/reissue', {});
    //             } catch (_error) {
    //                 if (_error.response && _error.response.data) {
    //                     return Promise.reject(_error.response.data);
    //                 }
    //                 return Promise.reject(_error);
    //             }
    //         }
    //     }
    //     return Promise.reject(err);
    // }
);


instance.interceptors.response.use(
    (response) => {
        return response;
    }
);

export default instance;