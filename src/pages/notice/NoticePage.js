import "./NoticePage.scss";
import { Pagination } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";

import notice from "../../imgs/banner/notice.jpg";
import { myRole } from "../../hooks/useAuth";

const isAdmin = true;

function NoticePage(props) {
  const navigate = useNavigate();
  const [boardlist, setBoardlist] = useState({});
  const [loading, setloading] = useState(false);
  const [boardId, setBoardId] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pageList, setPageList] = useState(1);

  useEffect(() => {
    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "공지사항") {
            setBoardId(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/1`,
              "GET"
            ).then((response) => {
              if (response.success) {
                setBoardlist(response.response);
                setloading(true);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "자유게시판 목록 가져오기를 실패했습니다.",
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

  const onClickRegister = () => {
    myRole().then((response) => {
      if (response === "not authorized") {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          navigate("/login");
        });
      } else if (response !== "admin") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. 관리자에게 문의해 주세요.",
        });
      } else {
        navigate("./noticeUpdate");
      }
    });
  };

  const onClickDetail = (list) => {
    myRole().then((response) => {
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
          navigate("/noticeDetail", {
            state: {
              boardId,
              articleId: list.id,
            },
          });
        }
      });
    });
  };

  /** Pagination 버튼을 생성하는 함수 */
  const addingPaginationItem = () => {
    if (!Object.keys(boardlist).length) return;
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
      if (pageList + k === boardlist.totalPages) break;
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
        if (boardlist.first) return;
        setPageNum((prev) => prev - 1);
        break;
      case "next":
        if (boardlist.last) return;
        setPageNum((prev) => prev + 1);
        break;
      default:
        setPageNum(boardlist.totalPages);
    }
  };

  return (
    <div className="noticePage">
      <div className="container">
        <img
          src={notice}
          alt="공지사항 배너"
          style={{ width: "100%", height: "200px" }}
        ></img>
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{"/"}</span>
          <span> 공지사항 </span>
        </div>
        <div className="search">
          <b> 검색구분 </b>
          <div className="inp_sch">
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
        {isAdmin ? (
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
              onClick={onClickRegister}
            >
              작성하기
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="contents">
          <div className="contentsTitle">
            <div className="num">번호</div>
            <div className="value">제목</div>
            <div className="date">작성일</div>
          </div>
          {loading ? (
            <>
              {boardlist.content.map((list, i) => {
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

export default NoticePage;
