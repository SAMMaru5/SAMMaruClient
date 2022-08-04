import "./Navigation.scss";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuth } from "./../hooks/useAuth";
import { call } from "../hooks/useFetch";
import { signout } from "../hooks/useAuth";
import { getCookie } from "../hooks/useCookie";
import { Helmet, HelmetProvider } from "react-helmet-async";
function Navigation() {
  const [show1, setShow1] = useState(false);
  //const [show2, setShow2] = useState(false);
  // const [show3, setShow3] = useState(false);
  //const [show4, setShow4] = useState(false);
  //const [show5, setShow5] = useState(false);
  // const [show6, setShow6] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setloading] = useState(false);
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    //refreshToken 갱신
    isAuth();

    if (accessToken && accessToken !== null) {
      call("/api/user/info", "GET", "").then((response) => {
        setUserInfo(response);
        setloading(true);
      });
    }
  }, [location, accessToken]);

  return (
    <div className="Navigation container" style={{ marginBottom: "100px" }}>
      <div className="userStatus" style={{ display: "flex" }}>
        <p className="attendance">접속자(0명)</p>

        {userInfo != null && loading ? (
          <div style={{ marginLeft: "auto" }}>
            <p className="userInfo">
              {userInfo.response.role === "ROLE_ADMIN" ? (
                <span>
                  <a href="/management">관리자 페이지</a> |{" "}
                </span>
              ) : null}
              <a href="/checkPw">정보 수정</a> |{" "}
              <a
                href="#!"
                onClick={() => {
                  signout();
                }}
              >
                로그아웃
              </a>{" "}
              | <a href="#!">{userInfo.response.username}</a>
            </p>
          </div>
        ) : (
          <div style={{ marginLeft: "auto" }}>
            <p className="user" onClick={() => navigate("/login")}>
              회원가입/로그인
            </p>
          </div>
        )}
      </div>

      <nav id="nav" style={{ justifyContent: "center" }}>
        <img
          src="img/logo.png"
          alt="로고 이미지"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <ul>
          <li>
            <a
              href="#!"
              className="icon fa-chart-bar"
              onMouseEnter={(e) => {
                setShow1(!show1);
              }}
              onMouseLeave={(e) => {
                setShow1(false);
              }}
              show={show1}
            >
              <span>샘마루</span>
            </a>
            <ul>
              <li>
                <a href="/clubIntro">동아리 소개</a>
              </li>
              <li>
                <a href="#!">활동</a>
              </li>
              <li>
                <a href="/awards">수상 경력</a>
              </li>
              <li>
                <a href="/clubMember1">회원</a>
                <ul>
                  <li>
                    <a href="/clubMember1">1기</a>
                  </li>
                  <li>
                    <a href="/clubMember2">2기</a>
                  </li>
                  <li>
                    <a href="/clubMember3">3기</a>
                  </li>
                  <li>
                    <a href="/clubMember4">4기</a>
                  </li>
                  <li>
                    <a href="/clubMember5">5기</a>
                  </li>
                  <li>
                    <a href="/clubMember6">6기</a>
                  </li>
                  <li>
                    <a href="/clubMember7">7기</a>
                  </li>
                  <li>
                    <a href="/clubMember8">8기</a>
                  </li>
                  <li>
                    <a href="/clubMember9">9기</a>
                  </li>
                  <li>
                    <a href="#!">10기</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a className="icon solid fa-home" href="/notice">
              <span>공지사항</span>
            </a>
          </li>
          <li>
            <a href="#!" className="icon fa-chart-bar">
              <span>자료실</span>
            </a>
            <ul>
              <li>
                <a href="#!">특강자료</a>
              </li>
              <li>
                <a href="#!">활동보고서</a>
              </li>
              <li>
                <a href="#!">소규모 프로젝트</a>
              </li>
              <li>
                <a href="/exam">족보</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="icon solid fa-cog" href="/freeBoard">
              <span>자유게시판</span>
            </a>
          </li>
          <li>
            <a className="icon solid fa-retweet" href="/photo">
              <span>사진첩</span>
            </a>
          </li>
          <li>
            <a className="icon solid fa-sitemap" href="no-sidebar.html">
              <span>충북대학교</span>
            </a>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.chungbuk.ac.kr/"
                >
                  충북대학교
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://eis.cbnu.ac.kr/"
                >
                  개신누리
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://software.cbnu.ac.kr/"
                >
                  소프트웨어학과
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://sw7up.cbnu.ac.kr/home"
                >
                  SW중심사업단
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cbnu.blackboard.com/"
                >
                  Ecampus
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://dorm.chungbuk.ac.kr/"
                >
                  기숙사
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* 
      <nav>
        <img
          src="img/logo.png"
          alt="로고 이미지"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <NavDropdown
          title="샘마루"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow1(!show1);
          }}
          onMouseLeave={(e) => {
            setShow1(false);
          }}
          show={show1}
        >
          <div className="navItem1">
            <NavDropdown.Item onClick="4.1">Link 1</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Link 2</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Link 3</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="공지사항"
          className="nav-dropdown"
          onClick={() => navigate("/notice")}
        ></NavDropdown>
        <NavDropdown
          title="자료실"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow3(!show3);
          }}
          onMouseLeave={(e) => {
            setShow3(false);
          }}
          show={show3}
        >
          <div className="navItem3">
            <NavDropdown.Item>특강 자료</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">활동보고서</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">소규모프젝</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">족보</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="자유게시판"
          className="nav-dropdown"
          onClick={() => navigate("/freeBoard")}
        ></NavDropdown>
        <NavDropdown
          title="사진첩"
          className="nav-dropdown"
          onClick={() => navigate("/photo")}
        ></NavDropdown>
        <NavDropdown
          title="충북대학교"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow6(!show6);
          }}
          onMouseLeave={(e) => {
            setShow6(false);
          }}
          show={show6}
        >
          <div className="navItem6">
            <NavDropdown.Item
              target="_blank"
              href="https://www.chungbuk.ac.kr/"
            >
              충북대학교
            </NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://eis.cbnu.ac.kr/">
              종합정보시스템
            </NavDropdown.Item>
            <NavDropdown.Item
              target="_blank"
              href="https://software.cbnu.ac.kr/"
            >
              소프트웨어학과
            </NavDropdown.Item>
            <NavDropdown.Item
              target="_blank"
              href="https://sw7up.cbnu.ac.kr/home"
            >
              SW중심사업단
            </NavDropdown.Item>
            <NavDropdown.Item
              target="_blank"
              href="https://cbnu.blackboard.com/"
            >
              ecampus
            </NavDropdown.Item>
            <NavDropdown.Item
              target="_blank"
              href="https://dorm.chungbuk.ac.kr/"
            >
              기숙사
            </NavDropdown.Item>
          </div>
        </NavDropdown>
      </nav> */}
      <HelmetProvider>
        <Helmet>
          <script src="/assets/js/jquery.min.js"></script>
          <script src="/assets/js/jquery.dropotron.min.js"></script>
          <script src="/assets/js/browser.min.js"></script>
          <script src="/assets/js/breakpoints.min.js"></script>
          <script src="/assets/js/util.js"></script>
          <script src="/assets/js/main.js"></script>
        </Helmet>
      </HelmetProvider>
    </div>
  );
}

export default Navigation;
