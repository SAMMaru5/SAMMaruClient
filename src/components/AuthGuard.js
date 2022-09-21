import {getCookie} from "../hooks/useCookie";
import React from "react";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
    const isAuth = getCookie('SammaruAccessToken');
    if(!isAuth) {
        return  <Navigate to='/login' replace/>;
    }
    return children;
}

export default AuthGuard;
