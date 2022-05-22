import './Board.scss';
import { useEffect, useState } from "react";
import { call } from "../../hooks/useFetch";

function BoardList({board}){
    return(
        <tr>
            <td>
                <p className='number'>
                    {board.id}
                </p>
            </td>
            <td>
                <p className='content'>
                    {board.title}
                </p>
            </td>
        </tr>
    );
}

function Board() {
    const [announcements, setannouncements] = useState({});
    const [loading, setloading] = useState(false);

    useEffect(() => {
        call("/no-permit/api/home/announcements", "GET", "")
        .then((response) => {
            setannouncements(response);
            setloading(true);
        })
    }, [])
    
    return (
        <div className="Board">
            <h4>동아리 공지</h4>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h5>번호</h5>
                        </th>
                        <th>
                            <h5>제목</h5>
                        </th>
                    </tr>
                </thead>
                {loading && announcements.success === true
                ? 
                <tbody>
                {
                    announcements.response.map((board, index)=>(<BoardList board={board} key={index}/>))
                }
                </tbody>


                : null}
               
            </table>
        </div>

    )
}
export default Board;