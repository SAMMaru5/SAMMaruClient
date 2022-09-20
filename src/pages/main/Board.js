import "./Board.scss";
import { useEffect, useState } from "react";
import { call } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { myRole } from "../../hooks/useAuth";

function Board() {
  const navigate = useNavigate();
  const [announcements, setannouncements] = useState({});
  const [loading, setloading] = useState(false);
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    call("/no-permit/api/home/announcements", "GET", "").then((response) => {
      setannouncements(response);
      setloading(true);
    });

    call("/no-permit/api/boards", "GET").then((response) => {
      if (response.success) {
        for (let i = 0; i < response.response.length; i++) {
          if (response.response[i].name === "공지사항") {
            setBoardId(response.response[i].id);
          }
        }
      }
    });
  }, []);

  const onClickDetaile = (list) => {
    myRole().then((response) => {
      if (response === "member" || response === "admin") {
        navigate("/noticeDetail", {
          state: {
            boardId: boardId,
            articleId: list.id,
          },
        });
      } else if (response === "temp") {
        Swal.fire({
          icon: "info",
          title: "접근 권한이 없습니다. 관리자에게 문의해 주세요.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    });
  };

  function BoardList({ board }) {
    return (
      <tr
        onClick={() => {
          onClickDetaile(board);
        }}
      >
        <td>
          <p>{board.id}</p>
        </td>
        <td>
          <p>{board.createDt.slice(0, 10)}</p>
        </td>

        <td>
          <p>{board.title}</p>
        </td>
        <td>
          <p>{board.author}</p>
        </td>
      </tr>
    );
  }
  return (
    <div className="Board">
      <table>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              #
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              날짜
            </th>

            <th scope="col" style={{ textAlign: "center" }}>
              제목
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              작성자
            </th>
          </tr>
        </thead>
        {loading && announcements.success === true ? (
          <tbody>
            {announcements.response.map((board, index) => (
              <BoardList board={board} key={index} />
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}
export default Board;
