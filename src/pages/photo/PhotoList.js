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
  // const [authorizationValue, setAuthorizationValue] = useState("");
  // const [refreshTokenValue, setRefreshTokenValue] = useState("");
  // const [img, setImg] = useState("");
  useEffect(() => {
    // const accessToken = getCookie("accessToken");
    // const refreshToken = getCookie("refreshToken");
    // if (accessToken && accessToken !== null) {
    //   setAuthorizationValue(accessToken);
    // }
    // if (refreshToken && refreshToken !== null) {
    //   setRefreshTokenValue(refreshToken);
    // }
    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "사진첩") {
            setBoardid(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/1`,
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

  // 게시글이 하나일 때 글이 정상적인 형태로 나타나지 않으므로 별도로 설정
  useEffect(() => {
    if (photoList.length === 1) setColMd(10);
    else {
      if (window.innerWidth >= 1200) setColMd(3);
      else if (window.innerWidth >= 1000) setColMd(4);
      else if (window.innerWidth >= 500) setColMd(6);
      else setColMd(3);
      // cleanup 함수 : 메모리 누수 방지
      return () => {
        setColMd(3);
      };
    }
  }, [photoList]);

  // 브라우저 너비의 변화에 따라 Col태그의 md값을 변경하기 위해 추가
  // (반응형, 문제점: 크기 변경 시 하단의 이벤트 호출이 매우 많이 일어남)
  window.addEventListener(
    "resize",
    function () {
      if (window.innerWidth >= 1200) setColMd(3);
      else if (window.innerWidth >= 1000) setColMd(4);
      else if (window.innerWidth >= 500) setColMd(6);
      else setColMd(3);
    },
    true
  );

  const onClickDetail = (list) => {
    myRole().then((response) => {
      if (response === "not authorized") {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        navigate("./photoDetail", {
          state: {
            boardId: boardid,
            articleId: list.id,
          },
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
              // console.log(list);
              // let url =
              //   "http://localhost:8080/api/boards/" +
              //   boardid +
              //   "/articles/" +
              //   list.id +
              //   "/files/0808b7eb-5534-4a62-85ed-c71cb0b88d10.png";
              // let xhr = new XMLHttpRequest();

              // xhr.open("GET", url, true);
              // xhr.setRequestHeader(
              //   "Authorization",
              //   "Bearer " + authorizationValue
              // );
              // xhr.responseType = "blob";
              // xhr.send();
              // xhr.onreadystatechange = function () {
              //   if (this.readyState == 4 && this.status == 200) {
              //     let url = window.URL || window.webkitURL;
              //     let imgsrc = url.createObjectURL(this.response);
              //     setImg(imgsrc);
              //   }
              // };
              // console.log(img);
              return (
                <Col md={colMd} key={i}>
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
