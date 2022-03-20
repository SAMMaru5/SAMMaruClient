import { API_BASE_URL } from "./app-config";
import { getCookie } from "./useCookie"

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken)
    }

    if(refreshToken && refreshToken !== null){
        headers.append("RefreshToken", "Bearer " + refreshToken)
    }

    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    if(request){
        options.body = JSON.stringify(request);
    }
    return fetch (options.url, options)
    .then((response) => response.json()
    .then((json) =>{
            if(!response.ok){
                return Promise.reject(json);
            }
            return json;
        })
    )
    .catch((error) => {
        // console.log(error.status);   //401 error에  따라 login 페이지로 이동할 예정
        // return Promise.reject(error);
    })
}

