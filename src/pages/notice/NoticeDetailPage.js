import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from "../../hooks/useFetch";

import "./NoticeDetail.scss";

function NoticeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    call(
      "/api/boards/" +
        location.state.boardId +
        "/articles/" +
        location.state.articleId,
      "GET"
    ).then((response) => {
      setArticle(response.response);
      setLoading(true);
    });
  }, [location.state.boardId, location.state.articleId]);

  return (
    <div className="NoticeDetail">
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
                  <i class="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i class="fa-regular fa-thumbs-up"></i>
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
              파일 다운로드
              <br />
              <a
                href={
                  "http://localhost:8080/no-permit/api/boards/" +
                  location.state.boardId +
                  "/articles/" +
                  location.state.articleId +
                  "/files/" +
                  article.files[0].filePath
                }
                className="text-decoration-none"
              >
                {article.files[0].fileName}
              </a>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <nav>
              <div>
                {" "}
                <span>
                  {" "}
                  <b>&lt;</b> 이전글
                </span>{" "}
                이전글입니다{" "}
              </div>
              <div>
                {" "}
                <span>
                  {" "}
                  <b>&gt;</b> 다음글
                </span>{" "}
                다음글입니다{" "}
              </div>
            </nav>
          </div>
          <div className="catalogue">
            <button
              onClick={() => {
                navigate("/notice");
              }}
            >
              목록
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="pageTitle">
            <h3>{location.state.id}</h3>
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
                <span>
                  {" "}
                  <b>&lt;</b> 이전글
                </span>{" "}
                이전글입니다{" "}
              </div>
              <div>
                {" "}
                <span>
                  {" "}
                  <b>&gt;</b> 다음글
                </span>{" "}
                다음글입니다{" "}
              </div>
            </nav>
          </div>
          <div className="catalogue">
            <button
              onClick={() => {
                navigate("/notice");
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

export default NoticeDetailPage;
