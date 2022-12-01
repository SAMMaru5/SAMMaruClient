import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBoards } from "../../hooks/boardServices";
import Comment from "../../components/Comment";
import "./ExamDetail.scss";
import { deletePost } from "../../hooks/usePostServices";

function ExamDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    getBoards(location).then((data) => {
      setArticle(data.data.response);
      setLoading(true);
    });
  }, [location]);

  return (
    <div className="ExamDetail">
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
            <pre>{article.content}</pre>
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
            <div className="file-download-frame mt-5">
              파일 다운로드
              <br />
              {article.files.map((file, id) => (
                <div key={id}>
                  <a
                    href={
                      process.env.REACT_APP_URL +
                      "/no-permit/api/boards/" +
                      location.state.boardId +
                      "/articles/" +
                      location.state.articleId +
                      "/files/" +
                      file.filePath
                    }
                    className="text-decoration-none"
                    key={id}
                  >
                    {file.fileName}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
          <Comment
            boardId={location.state.boardId}
            articleId={location.state.articleId}
          />
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
              className="deep-orange darken-4"
              onClick={() => deletePost(location.state)}
            >
              글 삭제
            </button>
            <button
              className="grey darken-3"
              onClick={() => {
                navigate("/exam");
              }}
            >
              목록
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <img
            src="img/loading.gif"
            alt="로딩중"
            style={{ margin: "3em auto", width: "25%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default ExamDetailPage;
