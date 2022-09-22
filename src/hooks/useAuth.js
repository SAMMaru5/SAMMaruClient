import api from "../utils/api";
import Swal from "sweetalert2";



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
    api.delete("/auth/logout").then(response => {
        sessionStorage.removeItem("EXPIRED_TIME");
        if(response.data.success){
            Swal.fire({
                icon: 'success',
                title: '로그아웃에 성공하셨습니다.',
            });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: '로그아웃에 실패하셨습니다.',
            });
        }
    })
    window.location.href = "/";
}