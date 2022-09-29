import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./SeminarDetail.scss";
import { getBoards } from "../../hooks/boardServices";
import Comment from '../../components/Comment'

function SeminarDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    getBoards(location).then(data => {
      setArticle(data.data.response);
      setLoading(true);
    });
  }, [location]);

  return (
    <div className="SeminarDetail">
      {loading ? (
        <div className="container">
          <div className="pageTitle">
            <h3>{article.title}</h3>
            <div className="pageInfo">
              <dl>
                <dt>작성자 &#58;</dt>
                <dd>{article.author} &nbsp; &#124;</dd>

                <dt>작성일 &#58;</dt>
                <dd>{article.createDt} &nbsp; &#124;</dd>

                <dt>조회수 &#58;</dt>
                <dd>{article.viewCnt}</dd>
              </dl>
            </div>
          </div>

          <div className="contents">
            {article.content}
            <div className="contentsBottom">
              <span
                className="text-center text-white like"
                onClick={() => setLike((prev) => !prev)}
              >
                {like ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )}
                {/* "article.likeCnt"와 "article.viewCnt"의 값이 동일하게 넘어오는 문제가 있습니다(수정 필요!!) */}
                {like ? (
                  <span className="likeCnt font-weight-bold">
                    {article.likeCnt + 1}
                  </span>
                ) : (
                  <span className="likeCnt">{article.likeCnt}</span>
                )}
              </span>
            </div>
          </div>
          {article.files.length !== 0 ? (
            <div className="file-download-frame">
              <div className="border-top p-3">
                <h5 className="mb-3">첨부파일</h5>
                <a
                  href={
                    process.env.REACT_APP_URL + "/no-permit/api/boards/" +
                    location.state.boardId +
                    "/articles/" +
                    location.state.articleId +
                    "/files/" +
                    article.files[0].filePath
                  }
                  className="text-decoration-none border-0 p-2"
                >
                  <span className="icon fa-file"></span>{" "}
                  {article.files[0].fileName}
                </a>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <Comment boardId={location.state.boardId} articleId={location.state.articleId} />
          <div>
            <nav>
              <div>
                {" "}
                <span>이전글</span> 이전글입니다{" "}
              </div>
              <div>
                {" "}
                <span>다음글</span> 다음글입니다{" "}
              </div>
            </nav>
          </div>
          <div className="catalogue">
            <button
              onClick={() => {
                navigate("/seminar");
              }}
            >
              목록
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="pageTitle">
            {/* <h3>{location.state.id}</h3> */}
            <div className="pageInfo">
              <dl>
                <dt>작성자 &#58;</dt>
                <dd>관리자 &nbsp; &#124;</dd>

                <dt>작성일 &#58;</dt>
                <dd>2022-03-12 &nbsp; &#124;</dd>

                <dt>조회수 &#58;</dt>
                <dd>322</dd>
              </dl>
            </div>
          </div>

          <div className="contents">글 내용</div>
          <div>
            <nav>
              <div>
                {" "}
                <span>이전글</span> 이전글입니다{" "}
              </div>
              <div>
                {" "}
                <span>다음글</span> 다음글입니다{" "}
              </div>
            </nav>
          </div>
          <div className="catalogue">
            <button
              onClick={() => {
                navigate("/seminar");
              }}
            >
              목록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeminarDetailPage;
