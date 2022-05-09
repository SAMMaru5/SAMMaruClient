import "./NoticePage.scss";
import { Badge, Button, Pagination } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";
const axios = require("axios").default;

const isAdmin = true;

function NoticePage(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [boardlist, setBoardlist] = useState({});
  const [loading, setloading] = useState(false);
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && accessToken !== null) {
      setAuthorizationValue("Bearer " + accessToken);
    }
    if (refreshToken && refreshToken !== null) {
      setRefreshTokenValue("Bearer " + refreshToken);
    }

    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name == "공지사항") {
            setBoardId(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/1`,
              "GET"
            ).then((response) => {
              console.log(response);
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
  }, []);

  const selectContent = (e) => {
    console.log(e.target.id);
    navigate("/noticeDetail", { state: { id: e.target.id } });
  };

  const onClickRegister = () => {
    if (authorizationValue == "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (refreshTokenValue == "") {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    navigate("/notice/noticeUpdate");
  };

  function getData() {
    return data.map((item) => (
      <div className="content">
        <div className="num" key={item.boardId}>
          {item.boardId}
        </div>
        <div className="contents" onClick={selectContent} id={item.boardId}>
          {item.boardname}
        </div>
      </div>
    ));
  }

  // const contentList = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/boards");
  //     setData(response.data.response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // contentList();

  // contentList.map((item) =>
  //   item.important ? (
  //     <div className="important">
  //       <div className="num" key={item.num}>
  //         <Badge bg="danger">중요</Badge>
  //       </div>
  //       <div className="contents" id={item.num} onClick={selectContent}>
  //         {item.value}
  //       </div>
  //       <div className="file">
  //         {item.file ? (
  //           <img src="premium-icon-attachments-327931.png" alt="첨부"></img>
  //         ) : (
  //           <div> </div>
  //         )}
  //       </div>
  //       <div className="date">{item.date}</div>
  //     </div>
  //   ) : (
  //     <div className="content">
  //       <div className="num" key={item.num}>
  //         {item.num}
  //       </div>
  //       <div className="contents" onClick={selectContent} id={item.num}>
  //         {item.value}
  //       </div>
  //       <div className="file">
  //         {item.file ? (
  //           <img src="premium-icon-attachments-327931.png" alt="첨부"></img>
  //         ) : (
  //           <div> </div>
  //         )}
  //       </div>
  //       <div className="date">{item.date}</div>
  //     </div>
  //   )
  // );

  return (
    <div className="noticePage">
      <div className="title">
        <div className="thumbnail">
          <img src="noticeThumbNail.png" alt="thumbnail" />{" "}
        </div>
        <div className="pageName">
          <span>공지사항</span>
        </div>
      </div>
      <div className="container">
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{"/"}</span>
          <span> 공지사항 </span>
        </div>
        <div className="search">
          <b> 검색구분 </b>
          <div className="inp_sch">
            <select name="srchTp">
              <option value="title">제목</option>
              <option value="cpntent">내용</option>
              <option value="both">제목+내용</option>
            </select>
            <input type="text"></input>
            <input type="submit" value={"검색"}></input>
          </div>
        </div>
        <div className="contents">
          <div className="contentsTitle">
            <div className="num">번호</div>
            <div className="value">제목</div>
            <div className="date">작성일</div>
          </div>
          {loading ? (
            <>
              {boardlist.map((list, i) => {
                return (
                  <div className="eachContents">
                    <div key={i} className="content" onClick={()=>{navigate('/noticeDetail', {
                                                                                state: {
                                                                                    boardId : boardId,
                                                                                    articleId : list.id
                                                                                    ,
                                                                                },
                                                                              });}}>
                      <div className="num">{list.id}</div>
                      <div className="value">{list.title}</div>
                      <div className="date">{list.createDt}</div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      {isAdmin ? (
        <div className="adminPost">
          <Button onClick={onClickRegister}>작성하기</Button>
        </div>
      ) : (
        <div></div>
      )}

      <div className="pageNum">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
}

export default NoticePage;
