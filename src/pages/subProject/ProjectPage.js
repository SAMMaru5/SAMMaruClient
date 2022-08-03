import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";
import Swal from "sweetalert2";
import { call } from "../../hooks/useFetch";

import project from "../../imgs/banner/project.jpg";

function ProjectPage() {
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
          if (response.response[i].name === "소규모프로젝트") {
            setBoardId(response.response[i].id);
            call(
              `/no-permit/api/boards/${response.response[i].id}/pages/1`,
              "GET"
            ).then((response) => {
              // console.log(response);
              if (response.success) {
                setBoardlist(response.response);
                setloading(true);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "소규모프로젝트 목록 가져오기를 실패했습니다.",
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

  const examUpload = () => {
    if (authorizationValue === "") {
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

    if (refreshTokenValue === "") {
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
    navigate("./projectUpdate");
  };

  const onClickDetail = (list) => {
    call("/api/user/info", "GET").then((response) => {
      if (response !== undefined && response !== "undefined") {
        navigate("/projectDetail", {
          state: {
            boardId: boardId,
            articleId: list.id,
          },
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
    <div className="noticePage">
      <div className="container">
        <img
          src={project}
          alt="소규모프로젝트 배너"
          style={{ width: "100%", height: "200px" }}
        ></img>
        <div className="location">
          <img className="home" src="home.png" alt="home"></img>
          <span>{" /  "}</span>
          <span>{"   자료실"}</span>
          <span>{" /  "}</span>
          <span> 소규모 프로젝트 </span>
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
            onClick={examUpload}
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
              {boardlist.map((list, i) => {
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

export default ProjectPage;
