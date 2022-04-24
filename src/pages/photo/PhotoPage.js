import React, { useState, useEffect } from "react";

import PhotoList from "./PhotoList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";

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

    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name == "사진첩") {
            setBoardId(response.response[i].id);
          }
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "게시판 목록 가져오기를 실패했습니다.",
        });
      }
    });
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
      <PhotoList boardId={boardId} />
    </div>
  );
}

export default PhotoPage;
