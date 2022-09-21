import { delCookie } from "./useCookie";
import api from "../utils/api";

export function login(SignInRequest) {
    return api.post("/auth/login" , { ...SignInRequest })
        .then((response) => {
            console.log(
                "response.data.response.accessToken:::",
                response.data.response.accessToken
            );
            try {
                if (response.data.response.accessToken) {
                    sessionStorage.setItem(
                        "EXPIRED_TIME",
                        response.data.response.expiresAt
                    );
                    return response;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
    });
}


export function myRole() {
    return api.get("/no-permit/api/user/info").then((response)=>{
        if (!response) {
            return "not authorized";
        } else if (response.data.response.role === "ROLE_TEMP") {
            return "temp";
        } else if (response.data.response.role === "ROLE_MEMBER") {
            return "member";
        } else if (response.data.response.role === "ROLE_ADMIN") {
            return "admin";
        }
    });
}

export function signout() {
    sessionStorage.clear();
    delCookie("accessToken");
    window.location.href = "/";
}