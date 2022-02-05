import './Navigation.scss'

function Navigation() {
    return (
        <div className="Navigation">
            <div className='userStatus'>
                <p className='attendance'>
                    접속자(0명)
                </p>

                <p className='user'>
                    회원가입/로그인
                </p>
            </div>

            <nav>
                <img src="img/logo.png" alt="로고 이미지"/>

                <div className="dropdown">
                    <button className="dropbtn">샘마루</button>
                    <div className="dropdown-content">
                    <a href="#!">Link 1</a>
                    <a href="#!">Link 2</a>
                    <a href="#!">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">공지사항</button>
                    <div className="dropdown-content">
                    <a href="#!">Link 1</a>
                    <a href="#!">Link 2</a>
                    <a href="#!">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">자유게시판</button>
                    <div className="dropdown-content">
                    <a href="#!">특강 자료</a>
                    <a href="#!">활동보고서</a>
                    <a href="#!">소규모프젝</a>
                    <a href="#!">족보</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">사진첩</button>
                    <div className="dropdown-content">
                    <a href="#!">Link 1</a>
                    <a href="#!">Link 2</a>
                    <a href="#!">Link 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">충북대학교</button>
                    <div className="dropdown-content">
                    <a href="#!">충북대학교</a>
                    <a href="#!">전자정보대학</a>
                    <a href="#!">소프트웨어학과</a>
                    <a href="#!">SW중심사업단</a>
                    </div>
                </div>
            </nav>
            

        </div>

    )
}

export default Navigation;