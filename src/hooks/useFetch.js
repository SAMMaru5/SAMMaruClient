import { API_BASE_URL } from "./app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken)
    }
    else if(refreshToken && refreshToken !== null){
        headers.append("Authorization", "Bearer " + refreshToken)
    }

    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    // console.log(options)
    // console.log(headers)
    // console.log(refreshToken)
    // if(request){
    //     options.body = JSON.stringify(request);
    // }
    // return fetch (options.url, options)
    // .then((response) => response.json()
    // .then((json) =>{
    //         if(!response.ok){
    //             Promise.reject(json);
    //         }
    //         return json;
    //     })
    // )
    // .catch((error) => {
    //     console.log(error);
    // })

    return "test";
}

export function login(SignInRequest){
    console.log(SignInRequest)
    setCookie("accessToken", "test", 7);
    setCookie("refreshToken", "test1", 7);
    call("/auth/signin", "POST", SignInRequest);
    // return call("/auth/signin", "POST", SignInRequest).then((response)=>{
    //     if(response){
    //         console.log(response)
    //         setCookie("accessToken", "test", 7);
    //         setCookie("refreshToken", "test1", 7);
    //         // localStorage.setItem(ACCESS_TOKEN, response.token);
    //         // window.location.href = "/";
    //     }

    // }
    // );
}

export function signout() {
    delCookie("accessToken")
    delCookie("refreshToken")
    window.location.href = "/";
  }

function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x == cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
  }

  function delCookie(key){
    let todayDate = new Date();
    document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString()-1 + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}