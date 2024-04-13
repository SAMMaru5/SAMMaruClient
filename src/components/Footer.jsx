import './Footer.scss';

function Footer() {
  return (
    <section
      id='footer'
      style={{
        padding: '0 0 1rem',
        fontSize: '14.5px',
        borderTop: '1.75px solid #eee',
      }}
    >
      <div className='container'>
        <section className='row' style={{ margin: '0' }}>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '4rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a href='/clubintro' className='text-decoration-none border-0'>
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  샘마루
                </div>
              </a>
            </strong>
            <ul className='pl-0' style={{ fontWeight: '500' }}>
              <li
                className='list-inline'
                style={{ marginTop: '0.7rem', paddingBottom: '0.15rem' }}
              >
                <a href='/clubintro' className='text-decoration-none border-0'>
                  <span>동아리 소개</span>
                </a>
              </li>
              <li className='list-inline' style={{ paddingBottom: '0.15rem' }}>
                <a href='/awards' className='text-decoration-none border-0'>
                  <span>수상 경력</span>
                </a>
              </li>
              <li className='list-inline'>
                <a href='/member/1' className='text-decoration-none border-0'>
                  <span>회원</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '3rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a href='/notice' className='text-decoration-none border-0'>
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  공지사항
                </div>
              </a>
            </strong>
          </div>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '3rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a href='/seminar' className='text-decoration-none border-0'>
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  자료실
                </div>
              </a>
            </strong>
            <ul className='pl-0' style={{ fontWeight: '500' }}>
              <li
                className='list-inline'
                style={{ marginTop: '0.7rem', paddingBottom: '0.15rem' }}
              >
                <a href='/seminar' className='text-decoration-none border-0'>
                  <span>특강 자료</span>
                </a>
              </li>
              <li className='list-inline' style={{ paddingBottom: '0.15rem' }}>
                <a href='/report' className='text-decoration-none border-0'>
                  <span>활동 보고서</span>
                </a>
              </li>
              <li className='list-inline'>
                <a href='/project' className='text-decoration-none border-0'>
                  <span>소규모 프로젝트</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '3rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a href='/freeBoard' className='text-decoration-none border-0'>
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  자유게시판
                </div>
              </a>
            </strong>
          </div>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '3rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a href='/photo' className='text-decoration-none border-0'>
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  사진첩
                </div>
              </a>
            </strong>
          </div>
          <div
            className='col-1'
            style={{ paddingTop: '2rem', marginLeft: '3rem', width: '7.8rem' }}
          >
            <strong className='font-weight-bold'>
              <a
                href='https://www.chungbuk.ac.kr/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-decoration-none border-0'
              >
                <div className='navTitle'>
                  <span className='pointCircle'>•</span>
                  충북대학교
                </div>
              </a>
            </strong>
            <ul className='pl-0' style={{ fontWeight: '500' }}>
              <li
                className='list-inline'
                style={{ marginTop: '0.7rem', paddingBottom: '0.15rem' }}
              >
                <a
                  href='https://www.chungbuk.ac.kr/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-decoration-none border-0'
                >
                  <span>본교 홈페이지</span>
                </a>
              </li>
              <li className='list-inline' style={{ paddingBottom: '0.15rem' }}>
                <a
                  href='https://eis.cbnu.ac.kr/cbnuLogin'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-decoration-none border-0'
                >
                  <span>개신누리</span>
                </a>
              </li>
              <li className='list-inline'>
                <a
                  href='https://software.cbnu.ac.kr/'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='text-decoration-none border-0'
                >
                  <span>소프트웨어학부</span>
                </a>
              </li>
              <li className='list-inline'>
                <a
                  href='https://sw7up.cbnu.ac.kr/home'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-decoration-none border-0'
                >
                  <span>SW중심대학사업단</span>
                </a>
              </li>
              <li className='list-inline'>
                <a
                  href='https://ecampus.cbnu.ac.kr/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-decoration-none border-0'
                >
                  <span>eCampus</span>
                </a>
              </li>
              <li className='list-inline'>
                <a
                  href='https://dorm.chungbuk.ac.kr/home/main.php'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-decoration-none border-0'
                >
                  <span>학생생활관</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section className='row mb-1'>
          <div
            className='col'
            style={{
              marginTop: '2.5rem',
              marginLeft: '4.5rem',
            }}
          >
            <div>
              충청북도 청주시 서원구 충대로1, 충북대학교 전자정보대학
              소프트웨어학부 S4-1동(전자정보 3관) 113호
            </div>
          </div>
        </section>
        <section className='row'>
          <div
            className='col'
            style={{
              padding: '0 0 0.3rem',
              marginLeft: '5.25rem',
              width: '7.8rem',
            }}
          >
            <strong className='font-weight-bold'>
              &copy;
              <a
                href='/'
                className='text-decoration-none border-0 font-weight-normal'
                style={{ color: '#888' }}
              >
                &nbsp;SAMMARU
              </a>
              <small style={{ color: '#888' }}> All rights reserved.</small>
            </strong>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Footer;
