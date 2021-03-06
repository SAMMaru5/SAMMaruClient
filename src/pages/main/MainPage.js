// import Activity from "./Activity";
import Board from "./Board";
// import Schedule from "./Schedule";
import ScheduleDetaile from "./ScheduleDetaile";
import ClubIntroduction from "./ClubIntroduction";
import ClubActivities from "./ClubActivities";
import ClubAwards from "./ClubAwards";
import "./MainPage.scss";
import logo from "../../imgs/logo.png";
import sammaru from "../../imgs/sammaru.png";
import { useRef } from "react";

function MainPage() {
  const tab = useRef([]);

  function openTab(tabName) {
    var i;

    for (i = 0; i < tab.current.length; i++) {
      tab.current[i].style.display = "none";
    }
    if (tabName === "scheduletab") {
      tab.current[0].style.display = "block";
    } else if (tabName === "noticetab") {
      tab.current[1].style.display = "block";
    } else if (tabName === "boardtab") {
      tab.current[2].style.display = "block";
    }
  }

  
  return (
    <>
      <body className="homepage is-preload">
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
                }}
              />
              <h1 id="logo">
                <a href="index.html" style={{ position: "relative" }}>
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
                </a>
              </h1>
            </div>
          </section>

          <section id="features">
            <div
              className="container"
              style={{
                padding: "0 0 5rem 0",
                borderBottom: "solid 2px #e5e5e5",
                boxShadow:
                  "inset 0px -8px 0px 0px #fff, inset 0px -10px 0px 0px #e5e5e5",
              }}
            >
              <div className="w3-bar w3-black">
                <button
                  className="w3-bar-item w3-button"
                  style={{ background: "#6a81ed" }}
                  onClick={() => {
                    openTab("scheduletab");
                  }}
                >
                  ????????????
                </button>
                <button
                  className="w3-bar-item w3-button"
                  style={{ background: "#6a81ed" }}
                  onClick={() => {
                    openTab("noticetab");
                  }}
                >
                  ????????????
                </button>
                <button
                  className="w3-bar-item w3-button"
                  style={{ background: "#6a81ed" }}
                  onClick={() => {
                    openTab("boardtab");
                  }}
                >
                  ???????????????
                </button>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(247, 247, 247)",
                  marginTop: "50px",
                  height: "600px",
                }}
              >
                <div
                  id="schedule"
                  className="tab"
                  ref={(elem) => (tab.current[0] = elem)}
                >
                  <ScheduleDetaile />
                </div>
                <div
                  id="notice"
                  className="tab"
                  ref={(elem) => (tab.current[1] = elem)}
                  style={{ display: "none" }}
                >
                 <Board />
                </div>

                <div
                  id="board"
                  className="tab"
                  ref={(elem) => (tab.current[2] = elem)}
                  style={{ display: "none" }}
                >
                  <p>?????????</p>
                </div>
              </div>
            </div>
          </section>
          <ClubActivities />

          <section id="banner">
            <div className="container">
              <p style={{ fontSize: "27px" }}>
                Sammaru??? 'Software Algorithm Master'??? ?????? SAM??? <br />
                '??????', '??????'??? ????????? ??? ????????? ????????? ?????? ???????????? ????????????
                ????????? ?????????.
              </p>
            </div>
          </section>

          <ClubIntroduction />
          {/* <Board />
          <Activity />
          <Schedule /> */}
          <ClubAwards />
        </div>
        {/* 
 

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.dropotron.min.js"></script>
    <script src="assets/js/browser.min.js"></script>
    <script src="assets/js/breakpoints.min.js"></script>
    <script src="assets/js/util.js"></script>
    <script src="assets/js/main.js"></script> */}
      </body>
    </>
  );
}

export default MainPage;
