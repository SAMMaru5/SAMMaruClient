import api from "../utils/api";
import Swal from "sweetalert2";
import { delCookie, getCookie } from "./useCookie";

export function myRole() {
  return api.get("/no-permit/api/user/info").then((response) => {
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
  api.delete("/auth/logout").then((response) => {
    window.location.href = "/";
  });
}
