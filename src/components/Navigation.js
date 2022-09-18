import "./Navigation.scss";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuth } from "./../hooks/useAuth";
import { call } from "../hooks/useFetch";
import { signout } from "../hooks/useAuth";
import { getCookie } from "../hooks/useCookie";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setloading] = useState(false);
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    //refreshToken 갱신
    isAuth();

    if (accessToken && accessToken !== null) {
      call("/no-permit/api/user/info", "GET", "").then((response) => {
        setUserInfo(response);
        setloading(true);
      });
    }
  }, [location, accessToken]);

  return (
    <div className="Navigation container" style={{ marginBottom: "100px" }}>
      <div className="userStatus" style={{ display: "flex" }}>
        <p className="attendance">접속자 ?</p>

        {userInfo != null && loading ? (
          <div style={{ marginLeft: "auto" }}>
            <p className="userInfo">
              {userInfo.response.role === "ROLE_ADMIN" ? (
                <span>
                  <a href="/management" className="management">
                    관리자 페이지
                  </a>
                </span>
              ) : null}
              <a href="/checkPw" className="changeInfo">
                정보 수정
              </a>
              <a
                href="/"
                onClick={() => {
                  signout();
                }}
                className="signOut"
              >
                로그아웃
              </a>
              <a href="/" className="userName">
                {userInfo.response.username}
              </a>
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
        <ul className="mt-3">
          <li>
            <a href="/clubIntro" className="icon fa-chart-bar">
              <span>샘마루</span>
            </a>
            <ul>
              <li>
                <a href="/clubIntro" style={{ color: "#878787" }}>
                  동아리 소개
                </a>
              </li>

              <li>
                <a href="/awards" style={{ color: "#878787" }}>
                  수상 경력
                </a>
              </li>
              <li>
                <a href={"/member"} style={{ color: "#878787" }}>
                  회원
                </a>
                <ul>
                  <li>
                    <a href="/member/1" style={{ color: "#878787" }}>
                      1기
                    </a>
                  </li>
                  <li>
                    <a href="/member/2" style={{ color: "#878787" }}>
                      2기
                    </a>
                  </li>
                  <li>
                    <a href="/member/3" style={{ color: "#878787" }}>
                      3기
                    </a>
                  </li>
                  <li>
                    <a href="/member/4" style={{ color: "#878787" }}>
                      4기
                    </a>
                  </li>
                  <li>
                    <a href="/member/5" style={{ color: "#878787" }}>
                      5기
                    </a>
                  </li>
                  <li>
                    <a href="/member/6" style={{ color: "#878787" }}>
                      6기
                    </a>
                  </li>
                  <li>
                    <a href="/member/7" style={{ color: "#878787" }}>
                      7기
                    </a>
                  </li>
                  <li>
                    <a href="/member/8" style={{ color: "#878787" }}>
                      8기
                    </a>
                  </li>
                  <li>
                    <a href="/member/9" style={{ color: "#878787" }}>
                      9기
                    </a>
                  </li>
                  <li>
                    <a href="#!" style={{ color: "#878787" }}>
                      10기
                    </a>
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
            <a href="/seminar" className="icon fa-chart-bar">
              <span>자료실</span>
            </a>
            <ul>
              <li>
                <a href="/seminar" style={{ color: "#878787" }}>
                  특강자료
                </a>
              </li>
              <li>
                <a href="/report" style={{ color: "#878787" }}>
                  활동보고서
                </a>
              </li>
              <li>
                <a href="/project" style={{ color: "#878787" }}>
                  소규모 프로젝트
                </a>
              </li>
              <li>
                <a href="/exam" style={{ color: "#878787" }}>
                  족보
                </a>
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
            <a
              className="icon solid fa-sitemap"
              href="https://www.chungbuk.ac.kr/"
            >
              <span>충북대학교</span>
            </a>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.chungbuk.ac.kr/"
                  style={{ color: "#878787" }}
                >
                  충북대학교
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://eis.cbnu.ac.kr/"
                  style={{ color: "#878787" }}
                >
                  개신누리
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://software.cbnu.ac.kr/"
                  style={{ color: "#878787" }}
                >
                  소프트웨어학과
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://sw7up.cbnu.ac.kr/home"
                  style={{ color: "#878787" }}
                >
                  SW중심사업단
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cbnu.blackboard.com/"
                  style={{ color: "#878787" }}
                >
                  Ecampus
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://dorm.chungbuk.ac.kr/"
                  style={{ color: "#878787" }}
                >
                  기숙사
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

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
