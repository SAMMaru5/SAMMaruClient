import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./PhotoList.scss";
import { useNavigate } from "react-router-dom";
import { call } from "../../hooks/useFetch";

import Swal from "sweetalert2";

const PhotoList = () => {
  const navigate = useNavigate();
  const [photoList, setPhotoList] = useState({});

  useEffect(() => {
    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name == "사진첩") {
            call(`/api/boards/${response.response[i].id}/pages/0`, "GET").then(
              (response) => {
                console.log(response);
                if (response.success) {
                  setPhotoList(response.response);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "사진 목록 가져오기를 실패했습니다.",
                  });
                }
              }
            );
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

  console.log(photoList);

  return (
    <div className="photoMain">
      <Row>
        <Col span={8}>
          <div
            style={{ marginBottom: "20px", cursor: "pointer" }}
            onClick={() => navigate("./photoDetail")}
          >
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
        <Col span={8}>
          <div style={{ marginBottom: "20px", cursor: "pointer" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
        <Col span={8}>
          <div style={{ marginBottom: "20px", cursor: "pointer" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div style={{ marginBottom: "20px", cursor: "pointer" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
        <Col span={8}>
          <div style={{ marginBottom: "20px", cursor: "pointer" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
        <Col span={8}>
          <div style={{ marginBottom: "20px", cursor: "pointer" }}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg"
              style={{ width: "100%", height: "100%" }}
            ></img>
            <br />
            2019 샘마루 세미나
            <hr />
            작성자 | 작성일자
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PhotoList;
