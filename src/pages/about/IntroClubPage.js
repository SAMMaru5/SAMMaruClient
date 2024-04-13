import './IntroClubPage.scss';
import introduce from '../../imgs/banner/introduce.jpg';
import icon1 from '../../imgs/icon/iconIntro1.png';
import icon2 from '../../imgs/icon/iconIntro2.png';
import icon3 from '../../imgs/icon/iconIntro3.png';
import img from '../../imgs/img.png';

function IntroClubPage() {
  return (
    <div id='introPage'>
      <div className='container'>
        <img
          src={introduce}
          alt='banner'
          style={{
            width: '100%',
            height: '200px',
            margin: '50px 0px 80px 0px',
          }}
        />

        <div className='text'>
          <div className='oneline-intro'>
            <span>
              <span style={{ color: '#3a34c6' }}>SAMMaru</span>는 'Software
              Algorithm Master'의 약자 SAM과 <br /> '최고', '하늘'을 뜻하는 순
              우리말 마루를 합쳐 만들어진 <br /> 알고리즘 동아리입니다.
            </span>
          </div>

          <div className='grid' style={{ marginBottom: '10rem' }}>
            <div className='item'>
              <div className='title'>
                <div>
                  <img src={icon1} alt='스터디' />
                </div>
                <div className='type'>
                  스터디/세미나 <br /> 소규모 프로젝트
                </div>
              </div>
              <div>
                샘마루 동아리는 학습을 위해 자체적으로 세미나를 열고 다양한
                스터디를 통해 연구하고 학습합니다.
                <br />
                특히 저학년들은 소규모 프로젝트를 진행하며 프로그래밍 역량을
                향상시킵니다.
              </div>
            </div>

            <div className='item'>
              <div className='title'>
                <div>
                  <img src={icon2} alt='경진대회' />
                </div>
                <div className='type'>
                  경진대회 및 <br />
                  해커톤 참가
                </div>
              </div>
              <div>
                샘마루 동아리는 동아리원들끼리 실력을 키워 알고리즘 경진대회 및
                해커톤 대회에 참가하고 각종 공모전에도 참여하여 좋은 성적을
                거두고 있습니다.
              </div>
            </div>

            <div className='item'>
              <div className='title'>
                <div>
                  <img src={icon3} alt='친목' />
                </div>
                <div className='type'>
                  체육대회, <br />
                  개강총회, MT
                </div>
              </div>
              <div>
                샘마루 동아리는 선후배간의 친목도 중요하게 생각합니다. 체육대회,
                MT, 개강총회, 종강총회, 친해지길 바라 등 행사를 통해
                동아리원들간의 친목을 다지고 타 동아리와의 교류 또한 활성화하고
                있습니다.
              </div>
            </div>
          </div>

          {/* <div style={{margin: "2em 0"}}>
                    <span style={{fontSize: "1.6em", color: "#3a34c6"}}>동아리 임원 소개</span> <br/>
                    <img src={img} alt="조직도" style={{width: "100%", height: "100%", margin: "2em 0"}}/>
                </div> */}
        </div>
      </div>
    </div>
  );
}

export default IntroClubPage;
