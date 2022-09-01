import { call } from "./useFetch";
import { setCookie, delCookie, getCookie} from './useCookie';
import jwtDecode from 'jwt-decode'

//refreshToken 갱신
export function isAuth(){
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if((accessToken && accessToken !== null) || (refreshToken && refreshToken !== null))
        call("/auth/reissue", "POST", "")
        .then((response) => {
            const todayDate = new Date();
            try{
                if(response.success){
                    const decode = jwtDecode (response.response.accessToken);
                    setCookie("accessToken", response.response.accessToken, decode.exp - todayDate.getTime()/1000);

                    const decode2 = jwtDecode (response.response.refreshToken);
                    setCookie("refreshToken", response.response.refreshToken, decode2.exp - todayDate.getTime()/1000);
                    return response
                    // window.location.href = "/";
                }
                else{
                    return false;
                }
            }
            catch(err){
                return console.log(err)
            }
        })
}

export function login(SignInRequest){
    return call("/auth/signin", "POST", SignInRequest).then((response)=>{
        const todayDate = new Date();
        try{
            if(response.response.accessToken){
                const decode = jwtDecode (response.response.accessToken);
                setCookie("accessToken", response.response.accessToken, decode.exp - todayDate.getTime()/1000);

                const decode2 = jwtDecode (response.response.refreshToken);
                setCookie("refreshToken", response.response.refreshToken, decode2.exp - todayDate.getTime()/1000);
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

export function myRole(){

    return call("/no-permit/api/user/info", "GET", '').then((response)=>{
        if(response.success === false){
            return "not authorized"
        }
        else if(response.response.role ==="ROLE_TEMP"){
            return "temp"
        }
        else if(response.response.role === "ROLE_MEMBER") {
            return "member"
        }
        else if(response.response.role === "ROLE_ADMIN") {
            return "admin"
        }
    })
}

export function signout() {
    delCookie("accessToken")
    delCookie("refreshToken")

    window.location.href = "/";
  }