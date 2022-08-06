import "./ClubIntroduction.scss";

import pic from "../../imgs/pic.jpg";
import github from "../../imgs/logo.png";

function clubIntroduction() {
  // function openTab(tabName) {
  //   var i;
  //   var x = document.getElementsByClassName("tab");
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = "none";
  //   }
  //   document.getElementById(tabName).style.display = "block";
  // }

  return (
    <section id="main">
      <div
        className="container"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <div className="row">
          <div id="content" className="col-8 col-12-medium">
            <article className="box post">
              <header>
                <h2>
                  <a href="#!">
                    충북대학교 소프트웨어학과 알고리즘 동아리
                    <br />
                    <strong>SAMMaru </strong> ...
                  </a>
                </h2>
              </header>
              <a href="#!" className="image featured">
                <img src={pic} style={{ height: "100%" }} alt="" />
              </a>
              <h3>샘마루는 어떤 동아리 일까요?</h3>
              <p>
                항상 노력하며 실력을 키우는 동아리 동아리명 샘마루는 'Software
                Algorithm Master' 의 약자 SAM(샘)과 '최고', '하늘' 을 뜻하는
                순우리말 마루를 합쳐 만들어진 알고리즘 동아리 입니다. <br />
                알고리즘의 학습을 위해 기초프로그래밍(C, C++)을 시작으로
                자료구조를 공부하고 알고리즘 스터디를 통해 동아리 원들과 함께
                알고리즘에 대해 연구하고 학습합니니다. 또한 실력을 키워 알고리즘
                경진대회 및 해커톤 대회에 참가하고, 공모전에도 참여하고
                있습니다. 그리고 체육대회, MT등을 통해 동아리 원들과의 친목을
                다지고 타 동아리와의 교류 또한 활성화하고 있습니다.
              </p>
              <ul className="actions">
                <li>
                  <a
                    href="#!"
                    className="button icon solid fa-file"
                    style={{ backgroundColor: "rgb(106, 129, 237)" }}
                  >
                    Continue Reading
                  </a>
                </li>
              </ul>
            </article>
          </div>

          <div id="sidebar" className="col-4 col-12-medium">
            <section>
              <ul className="divided">
                <li>
                  <article className="box excerpt">
                    <header>
                      <span className="date">특강/세미나</span>
                      <h3>
                        <a href="/seminar">자체적 특강/세미나</a>
                      </h3>
                    </header>
                    <p>
                      3,4학년 동아리원이 자체적으로 특강과 세미나를 진행합니다.
                      프로젝트를 하기 위해서 꼭 필요한 github 사용법이나 C, C++,
                      Python, Java 등 프로그래밍언어 역량 향상을 위한 세미나를
                      진행합니다.
                    </p>
                  </article>
                </li>

                <li>
                  <article className="box excerpt">
                    <header>
                      <span className="date">시험자료</span>
                      <h3>
                        <a href="/exam">학과 시험은 기출문제로</a>
                      </h3>
                    </header>
                    <p>
                      동아리 선배들이 동아리 후배들을 위해서 과목별로 기출문제를
                      정리해두었습니다. 시험을 보기 전 미리 본인의 실력을 테스트
                      해볼 수 있습니다.
                    </p>
                  </article>
                </li>
              </ul>
            </section>

            <section>
              <ul className="divided">
                <li>
                  <article className="box highlight">
                    <header>
                      <h3>
                        <a href="/project">동아리 스터디</a>
                      </h3>
                    </header>
                    <a href="/project" className="image left">
                      <img src={github} alt="" />
                    </a>
                    <p>
                      샘마루 동아리는 자체적으로 깃허브를 운영하며 스터디를
                      진행합니다. 동아리원 누구나 참여가 가능합니다.
                    </p>
                    <ul className="actions">
                      <li>
                        <a
                          href="https://github.com/SAMMaru5"
                          className="button icon solid fa-file"
                          style={{ backgroundColor: "rgb(106, 129, 237)" }}
                        >
                          GitHub
                        </a>
                      </li>
                    </ul>
                  </article>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default clubIntroduction;
