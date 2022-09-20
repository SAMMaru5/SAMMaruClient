import React from "react";

import PhotoList from "./PhotoList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import photo from "../../imgs/banner/photo.jpg";
import { myRole } from "../../hooks/useAuth";

function PhotoPage() {
  const navigate = useNavigate();

  const photoUpload = () => {
    myRole().then((response) => {
      if (response === "not authorized") {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          navigate("/login");
        });
      } else if (response === "temp") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. 관리자에게 문의해 주세요.",
        });
      } else {
        navigate("./photoUpdate");
      }
    });
  };

  return (
    <div
      className="container"
      style={{
        width: "80%",
        marginTop: "150px",
      }}
    >
      <img
        src={photo}
        alt="사진첩 배너"
        // height값을 auto로 변경하여 브라우저의 크기가 변경되어도 이미지 비율 유지
        style={{ width: "100%", height: "auto" }}
      ></img>
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
