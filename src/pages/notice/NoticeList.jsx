import { useState } from "react";
import { Badge } from 'react-bootstrap';
import NoticePage from "./NoticePage";

const contentList = [
  {
    num: '0004',
    value: '공지글입니다.',
    file: true,
    date: '2022-02-26',
    important: true
  },
  {
    num: '0003',
    value: '공지글2입니다.',
    file: false,
    date: '2022-02-26',
    important: true
  },
  {
    num: '0002',
    value: '1번 게시글.',
    file: false ,
    date: '2022-02-26',
    important: false
  },
  {
    num: '0001',
    value: '2번 게시글.',
    file: true,
    date: '2022-02-26',
    important: false
  }
];

function NoticeList({}) {
  const [noticeNum, setNoticeNum] = useState(0);

  const selectContent = (e) => {
    setNoticeNum(e.target.id);
    NoticePage(noticeNum);
  }

  <div className="contents">
    <div className="contentsTitle">
            <div className="num">번호</div>
            <div className="value">제목</div>
            <div className="file">첨부</div>
            <div className="date">작성일</div>
          </div>
          <div className="eachContents">
            {
              contentList.map(item =>
                item.important ?
                  <div className="important" >
                    <div className="num" key={item.num}><Badge bg="danger">중요</Badge></div>
                    <div className="contents" onClick={selectContent} id={item.num}>{item.value}</div>
                    <div className="file" >{item.file ? <img src="premium-icon-attachments-327931.png" alt="첨부"></img> : <div> </div>}
                    </div>
                    <div className="date">{item.date}</div>
                  </div>
                  :
                  <div className="content" >
                    <div className="num" key={item.num}>{item.num}</div>
                    <div className="contents" onClick={selectContent} id={item.num}>{item.value}</div>
                    <div className="file">{item.file ? <img src="premium-icon-attachments-327931.png" alt="첨부"></img> : <div> </div>}
                    </div>
                    <div className="date">{item.date}</div>
                  </div>
              )
            }
    </div>
  </div>
}

export default NoticeList;