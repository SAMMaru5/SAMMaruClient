import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeminarDetail.scss";
import { getBoards } from "../../hooks/boardServices";
import Comment from "../../components/Comment";
import { deletePost } from "../../hooks/usePostServices";
import { UploadedFilesInArticle } from "../../components/UploadedFilesInArticle";
import { createBrowserHistory } from "history";

function SeminarDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const history = createBrowserHistory();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    getBoards(location).then((data) => {
      setPageNum(location.state.pageNum);
      setArticle(data.data.response);
      setLoading(true);
    });
  }, [location]);

  // 페이지 '뒤로가기'를 감지하는 코드
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        navigate("/seminar", {
          state: {
            pageNum,
          },
        });
      }
    });
  }, [locationKeys, history]);

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
                navigate("/seminar", {
                  state: {
                    pageNum,
                  },
                });
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

export default SeminarDetailPage;
