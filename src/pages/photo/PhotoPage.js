import React, { useState, useEffect } from "react";

import PhotoList from "./PhotoList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";

function PhotoPage() {
  const navigate = useNavigate();
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && accessToken !== null) {
      setAuthorizationValue("Bearer " + accessToken);
    }
    if (refreshToken && refreshToken !== null) {
      setRefreshTokenValue("Bearer " + refreshToken);
    }
  }, []);

  const photoUpload = () => {
    if (authorizationValue == "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (refreshTokenValue == "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    navigate("./photoUpdate");
  };

  return (
    <div className="container">
      <Button
        variant="primary"
        onClick={() => {
          photoUpload();
        }}
      >
        글쓰기
      </Button>
      <PhotoList />
    </div>
  );
}

export default PhotoPage;
