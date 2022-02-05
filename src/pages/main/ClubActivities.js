import './ClubActivities.scss'

function ClubActivities(){
    return(
    <div className="container">
        <div className="Activities">
          <div className="contentsLeft">
            <div className="title">
              <span className="small-title">SAMMaru</span> <br/>
              <span className="big-title">개강총회</span></div>
            <div className="shortSum">새로 시작하는 한학기</div>
            <div className="subtitle">노는걸 잘해야 공부도 잘한다</div>
            <div className="detail">모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.</div>
            <div className="button"><button><a href="#!">동아리 사진첩 바로가기</a></button></div>
          </div>
          <div className="image">
            <img src="KakaoTalk_Moim_3j5Aj3GPJCSf5xatggd2eVZXl3R62m.jpg" alt="사진"></img>
          </div>
       </div>
          <div className="Activities">
            <div className="image">
              <img src="KakaoTalk_Moim_3j5Aj3GPJCSf5xatggd2eVZXl3R62m.jpg" alt="사진"></img>
            </div>
            <div className="contentsRight">
              <div className="title">
                <span className="small-title">SAMMaru</span> <br />
                <span className="big-title">개강총회</span></div>
              <div className="shortSum">새로 시작하는 한학기</div>
              <div className="subtitle">노는걸 잘해야 공부도 잘한다</div>
              <div className="detail">모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.</div>
              <div className="button"><button><a href="#!">동아리 사진첩 바로가기</a></button></div>
            </div>
  
          </div>
      </div>
      )
}

export default ClubActivities;