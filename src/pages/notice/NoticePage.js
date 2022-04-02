import "./NoticePage.scss";
import { Badge, Button, Pagination } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;
const ACCESS_TOKEN = "ACCESS_TOKEN";
const accessToken = localStorage.getItem("ACCESS_TOKEN");

const isAdmin = false;

// 백엔드에서 공지 정렬할때,
// 중요한거 맨 앞으로 들고오기 (기본 내림차순)

// const contentList = [
//   {
//     num: "0004",
//     value: "공지글입니다.",
//     file: true,
//     date: "2022-02-26",
//     important: true,
//   },
//   {
//     num: "0003",
//     value: "공지글2입니다.",
//     file: false,
//     date: "2022-02-26",
//     important: true,
//   },
//   {
//     num: "0002",
//     value: "1번 게시글.",
//     file: false,
//     date: "2022-02-26",
//     important: false,
//   },
//   {
//     num: "0001",
//     value: "2번 게시글.",
//     file: true,
//     date: "2022-02-26",
//     important: false,
//   },
// ];



function NoticePage(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const contentList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/boards');
      setData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  contentList();

  const selectContent = (e) => {
    console.log(e.target.id);
    navigate('/noticeDetail', { state: { id: e.target.id } });
  };

  function getData() {
    return data.map((item) =>
      <div className="content">
        <div className="num" key={item.boardId}>
          {item.boardId}
        </div>
        <div
          className="contents"
          onClick={selectContent}
          id={item.boardId}
        >
          {item.boardname}
        </div>
      </div>
    );
  }

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
            <div className="file">첨부</div>
            <div className="date">작성일</div>
          </div>
          <div className="eachContents">
            {
              getData()
            }
          </div>
        </div>
      </div>
      {isAdmin ? (
        <div className="adminPost">
          <Button>작성하기</Button>
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


/* {contentList.map((item) =>
              item.important ? (
                <div className="important">
                  <div className="num" key={item.num}>
                    <Badge bg="danger">중요</Badge>
                  </div>
                  <div className="contents" id={item.num} onClick={selectContent}>
                    {item.value}
                  </div>
                  <div className="file">
                    {item.file ? (
                      <img
                        src="premium-icon-attachments-327931.png"
                        alt="첨부"
                      ></img>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                  <div className="date">{item.date}</div>
                </div>
              ) : (
                <div className="content">
                  <div className="num" key={item.num}>
                    {item.num}
                  </div>
                  <div
                    className="contents"
                    onClick={selectContent}
                    id={item.num}
                  >
                    {item.value}
                  </div>
                  <div className="file">
                    {item.file ? (
                      <img
                        src="premium-icon-attachments-327931.png"
                        alt="첨부"
                      ></img>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                  <div className="date">{item.date}</div>
                </div>
              )
            )} */