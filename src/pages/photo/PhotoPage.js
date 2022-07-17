import React, { useState, useEffect } from "react";

import PhotoList from "./PhotoList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";

import photo from "../../imgs/banner/photo.jpg";

function PhotoPage() {
  const navigate = useNavigate();
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [boardId, setBoardId] = useState(0);

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
    <div
      className="container"
      style={{
        width: "80%",
        marginTop: "150px",
      }}
    >
      <img src={photo} style={{ width: "100%", height: "200px" }}></img>
      <div
        style={{ display: "flex", justifyContent: "right", marginTop: "50px" }}
      >
        <button
          className="w3-bar-item w3-button"
          style={{
            background: "#6a81ed",
            width: "130px",
            padding: "10px 0px 10px 0px",
          }}
          onClick={photoUpload}
        >
          글쓰기
        </button>
      </div>
      <PhotoList />
    </div>
  );
}

export default PhotoPage;
