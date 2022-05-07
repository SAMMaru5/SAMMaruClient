import React, { useState, useEffect } from "react";
import { Badge, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";

function FreeBoardPage() {
  const navigate = useNavigate();
  const [authorizationValue, setAuthorizationValue] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [boardlist, setBoardlist] = useState({});
  let boardlistarr = [];
  const [loading, setloading] = useState(false);

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
          if (response.response[i].name == "자유게시판") {
            call(`/api/boards/${response.response[i].id}/pages/0`, "GET").then(
              (response) => {
                console.log(response);
                if (response.success) {
                  setBoardlist(response.response);
                  for (let objKey in response.response) {
                    boardlistarr.push(response.response[objKey]);
                  }
                  setloading(true);
                  console.log(boardlistarr);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "자유게시판 목록 가져오기를 실패했습니다.",
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

  const freeBoardUpload = () => {
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
    navigate("./freeBoardUpdate");
  };

  const movies = [
    {
      title: "the",
      genre: "gg",
      hello: "kk",
    },
    {
      title: "the11",
      genre: "gg11",
      hello: "kk11",
    },
    {
      title: "the22",
      genre: "gg22",
      hello: "kk22",
    },
  ];

  return (
    <div className="noticePage">
      <div className="title">
        <div className="thumbnail">
          <img src="noticeThumbNail.png" alt="thumbnail" />{" "}
        </div>
        <div className="pageName">
          <span>자유게시판</span>
        </div>
      </div>
      <div className="container">
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{"/"}</span>
          <span> 자유게시판 </span>
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
                  <div key={i} className="contentsTitle eachContents">
                    <div className="num">{list.id}</div>
                    <div className="value">{list.title}</div>
                    <div className="date">{list.createDt}</div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      <div className="adminPost">
        <Button
          onClick={() => {
            freeBoardUpload();
          }}
        >
          작성하기
        </Button>
      </div>

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

export default FreeBoardPage;
