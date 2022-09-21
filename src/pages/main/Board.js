import "./Board.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {getBoardList} from "../../hooks/boardServices";

function Board() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState({});
    const [loading, setLoading] = useState(false);
    const [boardId, setBoardId] = useState();

    useEffect(() => {
        api.get("/no-permit/api/home/announcements").then((response) => {
            setAnnouncements(response);
            setLoading(true);
        });

        getBoardList().then(response => {
            console.log(response.data);
            if(response.data.success) {
                response.data.response.forEach(res => {
                    if(res.name === '공지사항'){
                        setBoardId(res.id);
                    }
                })
            }
        });
    }, []);

    const onClickDetail = (list) => {
        navigate("/noticeDetail", {
            state: {
                boardId,
                articleId: list.id,
            },
        });
    };

    function BoardList({ board }) {
        return (
            <tr
                onClick={() => {
                    onClickDetail(board);
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