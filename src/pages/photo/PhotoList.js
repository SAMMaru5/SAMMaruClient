import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import "./PhotoList.scss";
import { useNavigate } from "react-router-dom";
import { getArticleList, getBoardList } from "../../hooks/boardServices";

const PhotoList = () => {
  const navigate = useNavigate();
  const [photoList, setPhotoList] = useState({});
  const [loading, setloading] = useState(false);
  const [boardId, setBoardid] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pageList, setPageList] = useState(1);

  useEffect(() => {
    getBoardList().then((response) => {
      if (response.data.success) {
        response.data.response.forEach((res) => {
          if (res.name === "사진첩") {
            setBoardid(res.id);
            getArticleList(res.id, pageNum, 10).then((res) => {
              setPhotoList(res.data.response);
              setloading(true);
            });
          }
        });
      }
    });

    if (pageNum % 10 === 1) setPageList(pageNum);
    else if (pageNum % 10 === 0) setPageList(pageNum - 9);
    else setPageList(parseInt(pageNum / 10) * 10 + 1);
  }, [pageNum]);

  const onClickDetail = (list) => {
    navigate("./photoDetail", {
      state: {
        boardId,
        articleId: list.id,
      },
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
                        process.env.REACT_APP_URL +
                        "/no-permit/api/boards/" +
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
