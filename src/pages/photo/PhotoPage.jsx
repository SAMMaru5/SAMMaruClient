import React from "react";

import PhotoList from "./PhotoList";
import { useNavigate } from "react-router-dom";
import photo from "../../imgs/banner/photo.jpg";

function PhotoPage() {
  const navigate = useNavigate();

  const photoUpload = () => {
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
