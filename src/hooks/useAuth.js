import { call } from "./useFetch";
import { setCookie, delCookie, getCookie} from './useCookie';
import jwtDecode from 'jwt-decode'

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

export function signout() {
    delCookie("accessToken")
    delCookie("refreshToken")

    window.location.href = "/";
  }