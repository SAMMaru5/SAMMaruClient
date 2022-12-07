import Board from "./Board";
import ClubIntroduction from "./ClubIntroduction";
import ClubActivities from "./ClubActivities";
import "./MainPage.scss";
import logo from "../../imgs/logo.png";
import sammaru from "../../imgs/sammaru.png";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <div className="homepage is-preload">
        <div id="page-wrapper">
          <section
            id="header"
            style={{
              marginBottom: "7rem",
            }}
          >
            <div className="container">
              <img
                src={sammaru}
                alt=""
                style={{
                  width: "70%",
                  height: "100%",
                  paddingbottom: "50px",
                  marginTop: "-80px",
                  borderRadius: "50px",
                }}
              />
              <h1 id="logo">
                <Link to="clubIntro" style={{ position: "relative" }}>
                  WELCOME TO &nbsp;&nbsp;&nbsp;&nbsp;
                  <img
                    src={logo}
                    alt=""
                    style={{
                      position: "absolute",
                      zIndex: "10",
                      width: "100px",
                      height: "100px",
                      marginTop: "-40px",
                      marginLeft: "-100px",
                    }}
                  />
                  &nbsp;SAMMaru
                </Link>
              </h1>
            </div>
          </section>

          <section id="features">
            <header>
              <h2>
                <strong style={{ letterSpacing: "1rem" }}>공지사항</strong>
              </h2>
            </header>
            <div
              id="notice"
              className="container"
              style={{
                marginTop: "2rem",
                width: "53rem",
              }}
            >
              <Board />
            </div>
          </section>
          <ClubActivities />

          <section id="banner">
            <div className="container">
              <p style={{ fontSize: "27px" }}>
                Sammaru는 'Software Algorithm Master'의 약자 SAM과 <br />
                '최고', '하늘'을 뜻하는 순 우리말 마루를 합쳐 만들어진 알고리즘
                동아리 입니다.
              </p>
            </div>
          </section>

          <ClubIntroduction />
        </div>
      </div>
    </>
  );
}

export default MainPage;
