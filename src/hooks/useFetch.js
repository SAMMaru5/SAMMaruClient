import { API_BASE_URL } from "./app-config";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken)
    }

    if(accessToken && accessToken !== null){
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

export function login(SignInRequest){
    return call("/auth/signin", "POST", SignInRequest).then((response)=>{
        try{
            if(response.response.accessToken){
                setCookie("accessToken", response.response.accessToken, 10);
                setCookie("refreshToken", response.response.refreshToken, 60);
                return response
                // window.location.href = "/";
            }
        }
        catch{
            return false
        }
        
    }
    );
}

export function signout() {
    delCookie("accessToken")
    window.location.href = "/";
  }

function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    // todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    // todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    todayDate.setTime(todayDate.getTime() + (expiredays * 60 * 1000)); // 분 단위로 만료 날짜 지정
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x === cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
  }

  function delCookie(key){
    let todayDate = new Date();
    document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString()-1 + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}