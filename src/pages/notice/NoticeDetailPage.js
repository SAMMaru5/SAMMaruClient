import styled from "styled-components";

const contentList = [
  {
    num: "0004",
    value: "공지글입니다.",
    file: true,
    date: "2022-02-26",
    important: true,
  },
  {
    num: "0003",
    value: "공지글2입니다.",
    file: false,
    date: "2022-02-26",
    important: true,
  },
  {
    num: "0002",
    value: "1번 게시글.",
    file: false,
    date: "2022-02-26",
    important: false,
  },
  {
    num: "0001",
    value: "2번 게시글.",
    file: true,
    date: "2022-02-26",
    important: false,
  },
];

function NoticeDetailPage(props) {
  const PageTitle = styled.div`
    border-top: 2px solid #000;
    border-bottom: 1px solid #dfdfdf;
    padding: 17.5px 0 16px;
  `;
  const PageInfo = styled.dt`
    float: left;
    margin-right: 15px;
  `;

  return (
    <div className="">
      <div>
        <PageTitle>제목</PageTitle>
        <div>
          <dl>
            <dt>작성자 | </dt>
            <dd>관리자</dd>

            <dt>작성일 | </dt>
            <dd>2022-03-12</dd>

            <dt>조회수 | </dt>
            <dd>322</dd>
          </dl>
        </div>
      </div>

      <div>
        <div>글 내용</div>
        <div>
          <nav>
            <div>
              <span>이전글</span>이전글입니다
            </div>
            <div>
              <span>다음글</span>다음글입니다
            </div>
          </nav>
        </div>
        <div>
          <button>목록</button>
        </div>
      </div>
    </div>
    // <div>
    //   {props.noticeNum}
    // </div>
  );
}

export default NoticeDetailPage;
