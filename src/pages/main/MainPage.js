import Board from "./Board";
import ClubIntroduction from "./ClubIntroduction";
import ClubActivities from "./ClubActivities";
import "./MainPage.scss";
import logo from "../../imgs/logo.png";
import sammaru from "../../imgs/sammaru.png";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const tab = useRef([]);
  const [containerClassName, setContainerClassName] = useState("container");

  function openTab(tabName) {
    var i;
    for (i = 0; i < tab.current.length; i++) {
      tab.current[i].style.display = "none";
    }
    if (tabName === "scheduletab") {
      setContainerClassName("container");
      tab.current[0].style.display = "block";
    } else if (tabName === "noticetab") {
      setContainerClassName("noticeClicked");
      tab.current[1].style.display = "block";
    }
  }

  return (
    <>
      <div className="homepage is-preload">
        <div id="page-wrapper">
          <section id="header">
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
            <div className={containerClassName}>
              <div className="w3-bar w3-black">
                <button
                  className="w3-bar-item w3-button"
                  style={{ background: "#6a81ed" }}
                  onClick={() => {
                    openTab("scheduletab");
                  }}
                >
                  학사일정
                </button>
                <button
                  className="w3-bar-item w3-button"
                  style={{ background: "#6a81ed", marginLeft: "50px" }}
                  onClick={() => {
                    openTab("noticetab");
                  }}
                >
                  공지사항
                </button>
              </div>
              <div>
                <div
                  id="notice"
                  className="tab"
                  ref={(elem) => (tab.current[1] = elem)}
                  style={{
                    display: "none",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                  }}
                >
                  <Board />
                </div>
              </div>
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
          {/* <Board />
          <Activity />
          <Schedule /> */}
        </div>
        {/* 
 
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.dropotron.min.js"></script>
    <script src="assets/js/browser.min.js"></script>
    <script src="assets/js/breakpoints.min.js"></script>
    <script src="assets/js/util.js"></script>
    <script src="assets/js/main.js"></script> */}
      </div>
    </>
  );
}

export default MainPage;
