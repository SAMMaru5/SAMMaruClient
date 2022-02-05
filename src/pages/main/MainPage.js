import MainActivity from './MainActivity'
import MainBoard from './MainBoard'
import MainSchedule from './MainSchedule'
import MainScheduleDetaile from './MainScheduleDetaile'
import Footer from '../../components/Footer'
import Navigation from '../../components/Navigation'

import "./clubIntroduction.scss";
import "./clubActivities.scss";

function MainPage() {
    return(
        <div className='MainPage'>
            <Navigation />
            <MainBoard />
            <MainSchedule />
            <MainActivity />
            { clubIntroduction() }
        {clubActivity_01()}
        {clubActivity_02()}
            <MainScheduleDetaile />

            {/* 동아리 수상실적 */}
            <Footer />
        </div>
    )
}


function clubIntroduction() {
  return (
    <div className="container">
      <div className="Introduction">
        <div className="title">동아리 소개</div>
        <div className="clubIntros">
          <div className="About">
            <img src="free-animated-icon-checklist-6416398.gif" alt="아이콘1"></img>
            <div className="label">About</div>
            <div className="details">사법권은 법관으로 구성된 법원에 속한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.</div>
          </div>
          <div className="Careers">
            <img src="free-animated-icon-checklist-6416398.gif" alt="아이콘1"></img>
            <div className="label">Careers</div>
            <div className="details">사법권은 법관으로 구성된 법원에 속한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.</div>

          </div>
          <div className="Sammaru">
            <img src="free-animated-icon-checklist-6416398.gif" alt="아이콘1"></img>
            <div className="label">Sammaru</div>
            <div className="details">사법권은 법관으로 구성된 법원에 속한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.</div>

          </div>
          <div className="Project">
            <img src="free-animated-icon-checklist-6416398.gif" alt="아이콘1"></img>
            <div className="label">Project</div>
            <div className="details">사법권은 법관으로 구성된 법원에 속한다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다.</div>

          </div>
        </div>
      </div>
    </div>
  );
}

function clubActivity_01() {
  return (
    <div className="container">
      <div className="Activities">
        <div className="contentsLeft">
          <div className="title">
            <span className="small-title">SAMMaru</span> <br/>
            <span className="big-title">개강총회</span></div>
          <div className="shortSum">새로 시작하는 한학기</div>
          <div className="subtitle">노는걸 잘해야 공부도 잘한다</div>
          <div className="detail">모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.</div>
          <div className="button"><button><a href="#">동아리 사진첩 바로가기</a></button></div>
        </div>
        <div className="image">
          <img src="KakaoTalk_Moim_3j5Aj3GPJCSf5xatggd2eVZXl3R62m.jpg" alt="사진"></img>
        </div>
     </div>
    </div>
  );
}


  function clubActivity_02() {
    return (
      <div className="container">
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
            <div className="button"><button><a href="#">동아리 사진첩 바로가기</a></button></div>
          </div>

        </div>
      </div>
    );
}

export default MainPage;