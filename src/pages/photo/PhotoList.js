import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./PhotoList.scss";
import { useNavigate } from "react-router-dom";
import { call } from "../../hooks/useFetch";
import { myRole } from "../../hooks/useAuth";

import Swal from "sweetalert2";

const PhotoList = () => {
  const navigate = useNavigate();
  const [photoList, setPhotoList] = useState({});
  const [loading, setloading] = useState(false);
  const [boardid, setBoardid] = useState();
  const [colMd, setColMd] = useState(3);

  useEffect(() => {
    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "사진첩") {
            setBoardid(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/1?pageSize=16`,
              "GET"
            ).then((response) => {
              if (response.success) {
                setPhotoList(response.response);
                setloading(true);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "사진 목록 가져오기를 실패했습니다.",
                });
              }
            });
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

  const onClickDetail = (list) => {
    myRole().then((response) => {
      if (response === "member" || response === "admin") {
        navigate("./photoDetail", {
          state: {
            boardId: boardid,
            articleId: list.id,
          },
        });
      } else if (response === "temp") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. <br/> 관리자에게 문의해 주세요.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    });
  };

  return (
    <div className="photoMain" style={{ display: "flex" }}>
      {loading ? (
        <>
          <Row>
            {photoList.map((list, i) => {
              let createDt = list.createDt.slice(0, 10);
              return (
                <Col key={i}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onClickDetail(list);
                    }}
                    className="eachPost shadow"
                  >
                    <span className="hoverViewCnt">
                      Views <span>{list.viewCnt}</span>
                    </span>
                    <img
                      alt="사진첩 사진"
                      src={
                        "http://localhost:8080/no-permit/api/boards/" +
                        boardid +
                        "/articles/" +
                        list.id +
                        "/files/" +
                        list.files[0].filePath
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    ></img>
                    <br />
                    <br />
                    <strong>{list.title}</strong>
                    <hr />
                    <span>
                      {list.author} | {createDt}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      ) : null}
    </div>
  );
};

export default PhotoList;
