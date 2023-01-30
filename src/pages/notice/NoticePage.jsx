import "./bulletin.scss";
import { Pagination } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notice from "../../imgs/banner/notice.jpg";
import {
  getArticleList,
  getBoardList,
  searchArticles,
} from "../../hooks/boardServices";
import { myRole } from "../../hooks/useAuth";

function NoticePage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(false);
  const [boardId, setBoardId] = useState();
  const [pageNum, setPageNum] = useState(props.pageNum);
  const [pageList, setPageList] = useState(1);
  const [keywordSelectOption, setKeywordSelectOption] =
    useState("ARTICLE_TITLE");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // 비회원의 권한 확인
    myRole().then((response) => {
      if (response !== undefined) {
        getBoardList().then((response) => {
          if (response.data.success) {
            response.data.response.forEach((res) => {
              if (res.name === "공지사항") {
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

  useEffect(() => {
    location.state && setPageNum(location.state.pageNum);
  }, [location]);

  const noticeUpload = () => {
    navigate("./noticeUpdate");
  };

  const onClickDetail = (list) => {
    navigate("/noticeDetail", {
      state: {
        boardId: boardId,
        articleId: list.id,
        pageNum,
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
    <div className="bulletin">
      <div className="container">
        <img
          src={notice}
          alt="공지사항 배너"
          // height값을 auto로 변경하여 브라우저의 크기가 변경되어도 이미지 비율 유지
          style={{ width: "100%", height: "auto" }}
        ></img>
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{"/"}</span>
          <span> 공지사항 </span>
        </div>
        <div
          className="search"
          style={{ border: "1px solid gray", borderRadius: "5px" }}
        >
          <div className="inp_sch">
            <form style={{ display: "flex" }}>
              <b
                style={{
                  padding: "0 0.5rem 0 6rem",
                  marginTop: "0px",
                  color: "black",
                }}
              >
                {" "}
                검색구분{" "}
              </b>
              <select
                name="srchTp"
                onChange={(e) => setKeywordSelectOption(e.target.value)}
                style={{
                  width: "5.2rem",
                  color: "black",
                  textAlignLast: "left",
                }}
              >
                <option value="ARTICLE_TITLE" style={{ textAlign: "center" }}>
                  제목
                </option>
                <option value="ARTICLE_CONTENT" style={{ textAlign: "center" }}>
                  내용
                </option>
                <option
                  value="ARTICLE_TITLE_AND_CONTENT"
                  style={{ textAlign: "center" }}
                >
                  제목+내용
                </option>
                <option value="WRITER_NAME" style={{ textAlign: "center" }}>
                  작성자
                </option>
                <option
                  value="WRITER_STUDENT_ID"
                  style={{ textAlign: "center" }}
                >
                  학번
                </option>
              </select>
              <input
                type="text"
                value={keyword}
                style={{ paddingLeft: "0.4rem", border: "1px solid black" }}
                onChange={(res) => {
                  setKeyword(res.target.value);
                }}
              ></input>
              <button
                className="p-0 elegant-color text-white"
                style={{
                  width: "4rem",
                  height: "37px",
                  boxShadow: "none",
                  borderRadius: "3px",
                  fontWeight: "500",
                }}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  searchArticles(
                    boardId,
                    pageNum,
                    keyword,
                    keywordSelectOption
                  ).then((response) => {
                    setBoardList(response.data.response);
                  });
                }}
              >
                검색
              </button>
            </form>
          </div>
        </div>

        <div
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
            onClick={noticeUpload}
          >
            작성하기
          </button>
        </div>
        <div className="contents" style={{ paddingBottom: "2rem" }}>
          <div className="contentsHeader">
            <div className="num">번호</div>
            <div className="articleTitle">제목</div>
            <div className="author">작성자</div>
            <div className="date">작성일</div>
            <div className="view">조회수</div>
          </div>
          {loading ? (
            <>
              {boardList.content.map((list, idx) => {
                const createDt = list.createDt.slice(0, 10);
                return (
                  <div key={idx} className="eachContents">
                    <div
                      className="content"
                      onClick={() => {
                        onClickDetail(list);
                      }}
                    >
                      <div className="num">{idx + 1}</div>
                      <div className="articleTitle">
                        {list.title}
                        {list.files.length > 0 ? (
                          <div className="files">
                            <img src="img/file_icon.gif" alt="fileIcon" />
                            <small>[{list.files.length}]</small>
                          </div>
                        ) : null}
                      </div>
                      <div className="author">{list.author}</div>
                      <div className="date" style={{ textAlign: "center" }}>
                        {createDt}
                      </div>
                      <div className="view">{list.viewCnt}</div>
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
