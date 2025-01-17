import './Navigation.scss';
import api from '../utils/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signout } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        await api.get('/no-permit/api/user/info').then((response) => {
          if (response.data.success) {
            setUserInfo(response.data);
            setloading(true);
          } else {
            setUserInfo(null);
            setloading(true);
          }
        });
      } catch (error) {}
    }
    localStorage.getItem('sm-accessToken') && getUserInfo();
  }, [location]);

  return (
    <div
      className='Navigation container'
      style={{ marginBottom: '100px', position: 'relative' }}
    >
      <div className='userStatus' style={{ display: 'flex' }}>
        {userInfo != null && loading ? (
          <div style={{ marginLeft: 'auto' }}>
            <p className='userInfo'>
              {userInfo.response.role === 'ROLE_ADMIN' ? (
                <span>
                  <Link to='/management' className='management'>
                    관리자 페이지
                  </Link>
                </span>
              ) : null}
              <Link to='/modifyPassword' className='modifyPassword'>
                비밀번호 변경
              </Link>
              <Link
                to='/'
                onClick={() => {
                  signout();
                }}
                className='signOut'
              >
                로그아웃
              </Link>
              <Link to='/' className='userName'>
                {userInfo.response.username}
              </Link>
            </p>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            <Link to='agree' className='signUp' style={{ transition: '0.2s' }}>
              회원가입
            </Link>
            <Link to='login' className='signIn' style={{ transition: '0.2s' }}>
              로그인
            </Link>
          </div>
        )}
      </div>

      <nav id='nav' style={{ justifyContent: 'center' }}>
        <img
          src='img/logo.png'
          alt='로고 이미지'
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <ul className='mt-3'>
          {/* <li>
            <a href='/clubIntro' className='icon fa-chart-bar'>
              <span>샘마루</span>
            </a>
            <ul>
              <li>
                <a href='/clubIntro' style={{ color: '#878787' }}>
                  동아리 소개
                </a>
              </li>

              <li>
                <a href='/awards' style={{ color: '#878787' }}>
                  수상 경력
                </a>
              </li>
              <li>
                <a href={'/member/1'} style={{ color: '#878787' }}>
                  회원
                </a>
                <ul>
                  <li>
                    <a href='/member/1' style={{ color: '#878787' }}>
                      1기
                    </a>
                  </li>
                  <li>
                    <a href='/member/2' style={{ color: '#878787' }}>
                      2기
                    </a>
                  </li>
                  <li>
                    <a href='/member/3' style={{ color: '#878787' }}>
                      3기
                    </a>
                  </li>
                  <li>
                    <a href='/member/4' style={{ color: '#878787' }}>
                      4기
                    </a>
                  </li>
                  <li>
                    <a href='/member/5' style={{ color: '#878787' }}>
                      5기
                    </a>
                  </li>
                  <li>
                    <a href='/member/6' style={{ color: '#878787' }}>
                      6기
                    </a>
                  </li>
                  <li>
                    <a href='/member/7' style={{ color: '#878787' }}>
                      7기
                    </a>
                  </li>
                  <li>
                    <a href='/member/8' style={{ color: '#878787' }}>
                      8기
                    </a>
                  </li>
                  <li>
                    <a href='/member/9' style={{ color: '#878787' }}>
                      9기
                    </a>
                  </li>
                  <li>
                    <a href='#!' style={{ color: '#878787' }}>
                      10기
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
          <li>
            <a className='icon solid fa-home' href='/notice'>
              <span>공지사항</span>
            </a>
          </li>
          <li>
            <a href='/seminar' className='icon fa-chart-bar'>
              <span>자료실</span>
            </a>
            <ul>
              <li>
                <a href='/seminar' style={{ color: '#878787' }}>
                  특강자료
                </a>
              </li>
              <li>
                <a href='/report' style={{ color: '#878787' }}>
                  활동보고서
                </a>
              </li>
              <li>
                <a href='/project' style={{ color: '#878787' }}>
                  소규모 프로젝트
                </a>
              </li>
              {loading ? (
                <li>
                  <a href='/exam' style={{ color: '#878787' }}>
                    족보
                  </a>
                </li>
              ) : null}
            </ul>
          </li>
          <li>
            <a className='icon solid fa-cog' href='/freeBoard'>
              <span>자유게시판</span>
            </a>
          </li>
          <li>
            <a className='icon solid fa-retweet' href='/photo'>
              <span>사진첩</span>
            </a>
          </li>
          <li>
            <a
              className='icon solid fa-sitemap'
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.chungbuk.ac.kr/'
            >
              <span>충북대학교</span>
            </a>
            <ul>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.chungbuk.ac.kr/'
                  style={{ color: '#878787' }}
                >
                  본교 홈페이지
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://eis.cbnu.ac.kr/'
                  style={{ color: '#878787' }}
                >
                  개신누리
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://software.cbnu.ac.kr/'
                  style={{ color: '#878787' }}
                >
                  소프트웨어학부
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://sw7up.cbnu.ac.kr/home'
                  style={{ color: '#878787' }}
                >
                  SW중심대학사업단
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://ecampus.cbnu.ac.kr/'
                  style={{ color: '#878787' }}
                >
                  eCampus
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://dorm.chungbuk.ac.kr/'
                  style={{ color: '#878787' }}
                >
                  학생생활관
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <HelmetProvider>
        <Helmet>
          <script src='/assets/js/jquery.min.js'></script>
          <script src='/assets/js/jquery.dropotron.min.js'></script>
          <script src='/assets/js/browser.min.js'></script>
          <script src='/assets/js/breakpoints.min.js'></script>
          <script src='/assets/js/util.js'></script>
          <script src='/assets/js/main.js'></script>
        </Helmet>
      </HelmetProvider>
    </div>
  );
}

export default Navigation;
