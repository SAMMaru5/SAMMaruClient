import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import "./PhotoList.scss";
import { useNavigate } from "react-router-dom";
import { call } from "../../hooks/useFetch";
import { myRole } from "../../hooks/useAuth";

import Swal from "sweetalert2";

const PhotoList = () => {
  const navigate = useNavigate();
  const [photoList, setPhotoList] = useState({});
  const [loading, setloading] = useState(false);
  const [boardId, setBoardid] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pageList, setPageList] = useState(1);

  useEffect(() => {
    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "사진첩") {
            setBoardid(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/${pageNum}?pageSize=16`,
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

    if (pageNum % 10 === 1) setPageList(pageNum);
    else if (pageNum % 10 === 0) setPageList(pageNum - 9);
    else setPageList(parseInt(pageNum / 10) * 10 + 1);
  }, [pageNum]);

  const onClickDetail = (list) => {
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
        navigate("./photoDetail", {
          state: {
            boardId,
            articleId: list.id,
          },
        });
      }
    });
  };

  /** Pagination 버튼을 생성하는 함수 */
  const addingPaginationItem = () => {
    if (!Object.keys(photoList).length) return;
    const result = [];
    for (let k = 0; k < 10; k++) {
      result.push(
        <Pagination.Item
          active={pageNum === pageList + k}
          key={k}
          onClick={() => setPageNum(pageList + k)}
        >
          {pageList + k}
        </Pagination.Item>
      );
      if (pageList + k === photoList.totalPages) break;
    }
    return result;
  };

  /**
   * Pagination 각 기능 버튼들의 동작사항을 정의하는 함수
   * @param {string} command 명령 문자열을 넣어주세요
   * */
  const onChangingPage = (command) => {
    switch (command) {
      case "first":
        setPageNum(1);
        break;
      case "prev":
        if (photoList.first) return;
        setPageNum((prev) => prev - 1);
        break;
      case "next":
        if (photoList.last) return;
        setPageNum((prev) => prev + 1);
        break;
      default:
        setPageNum(photoList.totalPages);
    }
  };

  return (
    <div className="photoMain" style={{ display: "flex" }}>
      {loading ? (
        <>
          <Row>
            {photoList.content.map((list, i) => {
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
                        boardId +
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
      <div className="pageNum">
        <Pagination>
          <Pagination.First onClick={() => onChangingPage("first")} />
          <Pagination.Prev onClick={() => onChangingPage("prev")} />
          {addingPaginationItem()}
          <Pagination.Next onClick={() => onChangingPage("next")} />
          <Pagination.Last onClick={() => onChangingPage("last")} />
        </Pagination>
      </div>
    </div>
  );
};

export default PhotoList;
