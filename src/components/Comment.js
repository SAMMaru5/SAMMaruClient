import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Comment.scss";
import Swal from "sweetalert2";

function Comment(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState("");
  const [cur_node, setCurNode] = useState(0);
  const [all_page, setAllpage] = useState(0);

  useEffect(() => {
    api
      .get(
        "/api/boards/" +
          props.boardId +
          "/articles/" +
          props.articleId +
          "/comments",
        ""
      )
      .then((response) => {
        let data = response.data.response.reverse();

        setCommentList(data);
        if (data.length > 5) {
          setComments(data.slice(0, 5));
        } else {
          setComments(data);
        }

        let tmp = response.data.response.length / 5;
        tmp = Math.ceil(tmp);

        setAllpage(tmp);

        let p_arr = [];
        for (let i = 1; i <= tmp; i++) {
          p_arr.push(i);

          if (i === 5) {
            break;
          }
        }

        setPage(p_arr);
        if (document.getElementById("click0")) {
          document.getElementById("click0").className =
            document.getElementById("click0").className +
            " bg-primary text-white rounded";
        }
      });
  }, [props]);

  const insertComment = () => {
    api
      .post(
        "/api/boards/" +
          props.boardId +
          "/articles/" +
          props.articleId +
          "/comments",
        { content: content }
      )
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "댓글 작성을 성공했습니다.",
          }).then((result) => {
            if (result.isConfirmed) {
              setContent("");
              navigate("#", {
                state: {
                  boardId: props.boardId,
                  articleId: props.articleId,
                },
              });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "댓글 작성을 실패했습니다.",
          });
        }
      });
  };

  const change_page = (event, value) => {
    event.preventDefault();

    document.getElementById("click" + (cur_node % 5)).className = "page-link";
    document.getElementById("click" + ((value - 1) % 5)).className =
      "page-link bg-primary text-white rounded";
    setCurNode(value - 1);
    if (value > all_page) {
      setComments([]);
    } else {
      setComments(commentList.slice((value - 1) * 5, value * 5));
    }
  };

  const clickRight = (event) => {
    event.preventDefault();
    if (cur_node + 1 < all_page) {
      document.getElementById("click" + (cur_node % 5)).className = "page-link";
      document.getElementById("click" + ((cur_node + 1) % 5)).className =
        "page-link bg-primary text-white rounded";

      setCurNode(cur_node + 1);
      setComments(commentList.slice((cur_node + 1) * 5, (cur_node + 2) * 5));

      if ((cur_node + 1) % 5 === 0) {
        let p_arr = [];
        for (let i = cur_node + 2; i <= cur_node + 6; i++) {
          p_arr.push(i);
        }

        setPage(p_arr);
      }
    }
  };

  const clickLeft = (event) => {
    event.preventDefault();
    if (cur_node !== 0) {
      document.getElementById("click" + (cur_node % 5)).className = "page-link";
      document.getElementById("click" + ((cur_node - 1) % 5)).className =
        "page-link bg-primary text-white rounded";

      setCurNode(cur_node - 1);
      setComments(commentList.slice((cur_node - 1) * 5, cur_node * 5));

      if (cur_node % 5 === 0) {
        let p_arr = [];
        for (let i = cur_node - 4; i <= cur_node; i++) {
          p_arr.push(i);
        }

        setPage(p_arr);
      }
    }
  };
  return (
    <div id="comment">
      <div className="comment-frame">
        <p>댓글 ({commentList.length})</p>
        <div className="textarea-frame">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="댓글을 입력해주세요."
          ></textarea>
          <button onClick={insertComment}>등록</button>
        </div>
        <table>
          <tbody>
            {comments.length <= 0 ? (
              <tr key={"nothing"}>
                <td colSpan="5">등록된 댓글이 없습니다.</td>
              </tr>
            ) : (
              comments.map((comment, i) => (
                <tr key={i} className="comment-tr">
                  <td className="user">
                    <p>{comment.content}</p>
                    <p>{comment.author}</p>
                    <p>{comment.createDt.slice(0, 10)}</p>
                    {/* <span>디엠 수정</span> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="d-flex justify-content-center align-items-center pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#!"
                aria-label="PreviouNexs"
                id="pageLeft"
                onClick={(e) => {
                  clickLeft(e);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {page.map((value, index) => (
              <li className="page-item" key={index}>
                <a
                  className="page-link"
                  id={"click" + ((value - 1) % 5)}
                  href="#!"
                  onClick={(e) => {
                    change_page(e, value);
                  }}
                >
                  {value}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className="page-link"
                href="#!"
                aria-label="Next"
                id="pageRight"
                onClick={(e) => {
                  clickRight(e);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Comment;
