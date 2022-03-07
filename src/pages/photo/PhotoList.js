import React from "react";
import { Row, Col } from "react-bootstrap";
import "./PhotoList.scss";

const PhotoList = () => {
  return (
    <div className="photoMain">
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
