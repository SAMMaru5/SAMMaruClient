import "../ArticleDetail.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBoards } from "../../hooks/boardServices";
import Comment from "../../components/Comment";
import { deletePost } from "../../hooks/usePostServices";
import { UploadedFilesInArticle } from "../../components/UploadedFilesInArticle";
import { createBrowserHistory } from "history";

function NoticeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const history = createBrowserHistory();

  const [article, setArticle] = useState({});
  const [prevArticleTitle, setPrevArticleTitle] = useState("");
  const [nextArticleTitle, setNextArticleTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [locationKeys, setLocationKeys] = useState([]);

  // router 이동 시 메모리 lack 제거를 위한 cleanup
  useEffect(() => {
    return () => setLoading(false);
  }, []);

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
        navigate("/notice", {
          state: {
            pageNum,
          },
        });
      }
    });
  }, [locationKeys, history]);

  const getPrevAndNextArticleTitle = (caseNum) => {
    getBoards({
      ...location,
      state: {
        ...location.state,
        articleId:
          caseNum === 1 ? article.prevArticleId : article.nextArticleId,
      },
    }).then((response) => {
      caseNum === 1
        ? setPrevArticleTitle(response.data.response.title)
        : setNextArticleTitle(response.data.response.title);
    });
  };

  if (loading) {
    if (article.prevArticleId !== 0) getPrevAndNextArticleTitle(1);
    if (article.nextArticleId !== 0) getPrevAndNextArticleTitle(2);
  }

  return (
    <div className="articleDetail">
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
            <span>{article.content}</span>
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
              {article.prevArticleId !== 0 && (
                <div>
                  <span>
                    이전글
                    <img src="img/arrow-up.png" alt="prevArticle" />
                  </span>
                  <button
                    onClick={(e) => {
                      navigate("/noticeDetail", {
                        state: {
                          boardId: location.state.boardId,
                          articleId: article.prevArticleId,
                          pageNum,
                        },
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    {prevArticleTitle}
                  </button>
                </div>
              )}
              {article.nextArticleId !== 0 && (
                <div>
                  <span>
                    다음글
                    <img src="img/arrow-down.png" alt="nextArticle" />
                  </span>
                  <button
                    onClick={(e) => {
                      navigate("/noticeDetail", {
                        state: {
                          boardId: location.state.boardId,
                          articleId: article.nextArticleId,
                          pageNum,
                        },
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    {nextArticleTitle}
                  </button>
                </div>
              )}
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
                navigate("/notice", {
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

export default NoticeDetailPage;
