import './Board.scss';
import { useEffect, useState } from "react";
import { call } from "../../hooks/useFetch";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


function Board() {
    const navigate = useNavigate();
    const [announcements, setannouncements] = useState({});
    const [loading, setloading] = useState(false);
    const [boardId, setBoardId] = useState();
    
    useEffect(() => {
        call("/no-permit/api/home/announcements", "GET", "")
        .then((response) => {
            setannouncements(response);
            setloading(true);
        })

        call("/no-permit/api/boards", "GET").then((response) => {
            if (response.success) {
              for (let i = 0; i < response.response.length; i++) {
                if (response.response[i].name == "공지사항") {
                  setBoardId(response.response[i].id);
                }
            }
        }
    }
)  
    }, [])
    
    const onClickDetaile = (list) => {
        call("/api/user/info", "GET").then((response)=>{
          if(response !== undefined && response !=='undefined'){
            navigate('/noticeDetail', {
              state: {
                  boardId : boardId,
                  articleId : list.id
                  ,
              },
            });
          }
          else{
            Swal.fire({
              icon: "error",
              title: "로그인이 필요합니다.",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          }
          
        })
    
      };

      
    function BoardList({board}){
        return(
            <tr onClick={()=>{onClickDetaile(board)}}>
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