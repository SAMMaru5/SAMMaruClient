import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { call } from '../../hooks/useFetch';

import "./NoticeDetail.scss";

function NoticeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    call("/api/boards/"+location.state.boardId+"/articles/"+location.state.articleId, "GET").then((response)=>{
      setArticle(response.response);
      setLoading(true);
    })

  }, [])
  
  return (
    <div className="NoticeDetail">
      {loading ? 
      <div className='container'>
        
        <div className="pageTitle">
          <h3>{location.state.articleId}</h3>
          <div className="pageInfo">
            <dl>
              <dt>작성자 &#58;</dt>
              <dd>{article.author}	&nbsp; &#124;</dd>

              <dt>작성일 &#58;</dt>
              <dd>{article.createDt}	&nbsp; &#124;</dd>

              <dt>조회수 &#58;</dt>
              <dd>{article.viewCnt}</dd>
            </dl>
          </div>
        </div>
        
        <div className='contents'>{article.content}</div>


          <div>
            <nav>
              <div> <span> <b>&lt;</b> 이전글</span> 이전글입니다 </div>
              <div> <span> <b>&gt;</b> 다음글</span> 다음글입니다 </div>
            </nav>
          </div>
          <div className='catalogue'>
          <button onClick={() => { navigate('/notice')}}>목록</button>
          </div>
        </div>
        :
        <div className='container'>
        <div className="pageTitle">
          <h3>{location.state.id}</h3>
          <div className="pageInfo">
            <dl>
              <dt>작성자 &#58;</dt>
              <dd>관리자	&nbsp; &#124;</dd>

              <dt>작성일 &#58;</dt>
              <dd>2022-03-12	&nbsp; &#124;</dd>

              <dt>조회수 &#58;</dt>
              <dd>322</dd>
            </dl>
          </div>
        </div>
        
        <div className='contents'>글 내용</div>
          <div>
            <nav>
              <div> <span> <b>&lt;</b> 이전글</span> 이전글입니다 </div>
              <div> <span> <b>&gt;</b> 다음글</span> 다음글입니다 </div>
            </nav>
          </div>
          <div className='catalogue'>
          <button onClick={() => { navigate('/notice')}}>목록</button>
          </div>
      </div>
}

</div>
)
}

export default NoticeDetailPage;
