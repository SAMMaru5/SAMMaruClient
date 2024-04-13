// import Board from './Board';
// import ClubIntroduction from './ClubIntroduction';
// import ClubActivities from './ClubActivities';
import icon1 from '../../imgs/icon/iconIntro1.png';
import icon2 from '../../imgs/icon/iconIntro2.png';
import icon3 from '../../imgs/icon/iconIntro3.png';
import './MainPage.scss';
import logo from '../../imgs/logo.png';
import sammaru from '../../imgs/sammaru.png';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <div className='homepage is-preload'>
        <div id='page-wrapper'>
          <section
            id='header'
            style={{
              marginBottom: '2.5rem',
            }}
          >
            <div className='container'>
              <img
                src={sammaru}
                alt=''
                style={{
                  width: '70%',
                  height: '100%',
                  paddingbottom: '50px',
                  marginTop: '-40px',
                  borderRadius: '50px',
                }}
              />
            </div>
          </section>

          <div id='introPage'>
            <div className='container'>
              <div className='text'>
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
                      샘마루 동아리는 학습을 위해 자체적으로 세미나를 열고
                      다양한 스터디를 통해 연구하고 학습합니다.
                      <br />
                      특히 저학년들은 소규모 프로젝트를 진행하며 프로그래밍
                      역량을 향상시킵니다.
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
                      샘마루 동아리는 동아리원들끼리 실력을 키워 알고리즘
                      경진대회 및 해커톤 대회에 참가하고 각종 공모전에도
                      참여하여 좋은 성적을 거두고 있습니다.
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
                      샘마루 동아리는 선후배간의 친목도 중요하게 생각합니다.
                      체육대회, MT, 개강총회, 종강총회, 친해지길 바라 등 행사를
                      통해 동아리원들간의 친목을 다지고 타 동아리와의 교류 또한
                      활성화하고 있습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
