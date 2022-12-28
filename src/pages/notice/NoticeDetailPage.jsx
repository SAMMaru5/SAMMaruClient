import "./NoticeDetail.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBoards } from "../../hooks/boardServices";
import Comment from "../../components/Comment";
import { deletePost } from "../../hooks/usePostServices";
import { UploadedFilesInArticle } from "../../components/UploadedFilesInArticle";

function NoticeDetailPage() {
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
          <UploadedFilesInArticle location={location} article={article} />
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
                navigate("/notice");
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

export default NoticeDetailPage;
