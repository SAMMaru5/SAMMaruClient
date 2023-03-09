import api from "../utils/api";
import Swal from "sweetalert2";
import { delCookie, getCookie } from "./useCookie";

export async function myRole() {
  try {
    return await api.get("/no-permit/api/user/info").then((response) => {
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
  } catch (error) {
    Swal.fire({
      title: "로그인이 필요한 서비스입니다.",
      text: "자동으로 로그인 페이지로 이동합니다.",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
    }).then((result) => {
      window.location.href = "/login";
    });
  }
}

export async function checkExpiredAccesstoken() {
  function expiredLogin() {
    Swal.fire({
      title: "로그인 상태 허용\n시간이 초과되었습니다.",
      text: "로그인 페이지로 다시 이동하시겠습니까?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  }

  if (localStorage.getItem("sm-accessToken")) {
    try {
      return await api.get("/no-permit/api/user/info").then((response) => {
        return response;
      });
    } catch (error) {
      localStorage.clear();
      expiredLogin();
    }
  } else expiredLogin();
}

export async function signout() {
  try {
    return await api
      .delete(process.env.REACT_APP_URL + "/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
  } catch (e) {}
}

export async function reissue(accessToken, refreshToken) {
  try {
    return await api
      .post(process.env.REACT_APP_URL + "/auth/reissue", {
        accessToken,
        refreshToken,
      })
      .then((response) => {
        return response;
      });
  } catch (e) {}
}
