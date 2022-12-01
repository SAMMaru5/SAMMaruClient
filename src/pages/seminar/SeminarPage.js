import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import seminar from "../../imgs/banner/seminar.jpg";
import { getArticleList, getBoardList } from "../../hooks/boardServices";
import { myRole } from "../../hooks/useAuth";

function SeminarPage() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(false);
  const [boardId, setBoardId] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pageList, setPageList] = useState(1);

  useEffect(() => {
    // 비회원의 권한 확인
    myRole().then((response) => {
      if (response != undefined) {
        getBoardList().then((response) => {
          if (response.data.success) {
            response.data.response.forEach((res) => {
              if (res.name === "특강자료") {
                setBoardId(res.id);
                getArticleList(res.id, pageNum, 10).then((res) => {
                  setBoardList(res.data.response);
                  setLoading(true);
                });
              }
            });
          }
        });
      }
    });

    if (pageNum % 10 === 1) setPageList(pageNum);
    else if (pageNum % 10 === 0) setPageList(pageNum - 9);
    else setPageList(parseInt(pageNum / 10) * 10 + 1);
  }, [pageNum]);

  const seminarUpload = () => {
    navigate("./seminarUpdate");
  };

  const onClickDetail = (list) => {
    navigate("/seminarDetail", {
      state: {
        boardId,
        articleId: list.id,
      },
    });
  };

  /** Pagination 버튼을 생성하는 함수 */
  const addingPaginationItem = () => {
    if (!boardList.totalElements) return;
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
      if (pageList + k === boardList.totalPages) break;
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
        if (boardList.first) return;
        setPageNum((prev) => prev - 1);
        break;
      case "next":
        if (boardList.last) return;
        setPageNum((prev) => prev + 1);
        break;
      default:
        setPageNum(boardList.totalPages);
    }
  };

  return (
    <div className="noticePage">
      <div className="container">
        <img
          src={seminar}
          alt="세미나 배너"
          // height값을 auto로 변경하여 브라우저의 크기가 변경되어도 이미지 비율 유지
          style={{ width: "100%", height: "auto" }}
        ></img>
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{" /  "}</span>
          <span>{"   자료실"}</span>
          <span>{" /  "}</span>
          <span> 특강 자료 </span>
        </div>
        <div className="search">
          <div className="inp_sch">
            <b> 검색구분 </b>
            <select name="srchTp">
              <option value="title" style={{ textAlign: "center" }}>
                제목
              </option>
              <option value="cpntent" style={{ textAlign: "center" }}>
                내용
              </option>
              <option value="both" style={{ textAlign: "center" }}>
                제목+내용
              </option>
            </select>
            <input type="text"></input>
            <input type="submit" value={"검색"}></input>
          </div>
        </div>

        <div
          className="adminPost"
          style={{
            display: "flex",
            justifyContent: "right",
            margin: "10px 0px 20px 0px",
          }}
        >
          <button
            className="w3-bar-item w3-button"
            style={{
              background: "#6a81ed",
              width: "130px",
              padding: "10px 0px 10px 0px",
            }}
            onClick={seminarUpload}
          >
            작성하기
          </button>
        </div>

        <div className="contents">
          <div className="contentsTitle">
            <div className="num">번호</div>
            <div className="value">제목</div>
            <div className="date">작성일</div>
          </div>
          {loading ? (
            <>
              {boardList.content.map((list, i) => {
                let createDt = list.createDt.slice(0, 10);
                return (
                  <div key={i} className="eachContents">
                    <div
                      className="content"
                      onClick={() => {
                        onClickDetail(list);
                      }}
                    >
                      <div className="num">{list.id}</div>
                      <div className="value">{list.title}</div>
                      <div className="date" style={{ textAlign: "center" }}>
                        {createDt}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

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
}

export default SeminarPage;
