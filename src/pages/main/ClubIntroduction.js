import "./ClubIntroduction.scss";

import pic from "../../imgs/pic.jpg";

function clubIntroduction() {
  function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
  }

  return (
    <section id="main">
      <div className="container">
        <div className="row">
          <div id="content" className="col-8 col-12-medium">
            <article className="box post">
              <header>
                <h2>
                  <a href="#">
                    충북대학교 소프트웨어학과 알고리즘 동아리
                    <br />
                    <strong>SAMMaru </strong> ...
                  </a>
                </h2>
              </header>
              <a href="#" className="image featured">
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
                    href="#"
                    className="button icon solid fa-file"
                    style={{ backgroundColor: "rgb(106, 129, 237)" }}
                  >
                    Continue Reading
                  </a>
                </li>
              </ul>
            </article>

            <article className="box post">
              <header>
                <h2>
                  <a href="#">
                    충북대학교 소프트웨어학과 알고리즘 동아리
                    <br />
                    <strong>SAMMaru </strong> ...
                  </a>
                </h2>
              </header>
              <a href="#" className="image featured">
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
                    href="#"
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
                      <span className="date">July 30</span>
                      <h3>
                        <a href="#">Just another post</a>
                      </h3>
                    </header>
                    <p>
                      Lorem ipsum dolor odio facilisis convallis. Etiam non nunc
                      vel est suscipit convallis non id orci lorem ipsum sed
                      magna consequat feugiat lorem dolore.
                    </p>
                  </article>
                </li>
                <li>
                  <article className="box excerpt">
                    <header>
                      <span className="date">July 28</span>
                      <h3>
                        <a href="#">And another post</a>
                      </h3>
                    </header>
                    <p>
                      Lorem ipsum dolor odio facilisis convallis. Etiam non nunc
                      vel est suscipit convallis non id orci lorem ipsum sed
                      magna consequat feugiat lorem dolore.
                    </p>
                  </article>
                </li>
                <li>
                  <article className="box excerpt">
                    <header>
                      <span className="date">July 24</span>
                      <h3>
                        <a href="#">One more post</a>
                      </h3>
                    </header>
                    <p>
                      Lorem ipsum dolor odio facilisis convallis. Etiam non nunc
                      vel est suscipit convallis non id orci lorem ipsum sed
                      magna consequat feugiat lorem dolore.
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
                        <a href="#">Something of note</a>
                      </h3>
                    </header>
                    <a href="#" className="image left">
                      <img src="images/pic06.jpg" alt="" />
                    </a>
                    <p>
                      Phasellus sed laoreet massa id justo mattis pharetra.
                      Fusce suscipit ligula vel quam viverra sit amet mollis
                      tortor congue magna lorem ipsum dolor et quisque ut odio
                      facilisis convallis. Etiam non nunc vel est suscipit
                      convallis non id orci. Ut interdum tempus facilisis
                      convallis. Etiam non nunc vel est suscipit convallis non
                      id orci.
                    </p>
                    <ul className="actions">
                      <li>
                        <a
                          href="#"
                          className="button icon solid fa-file"
                          style={{ backgroundColor: "rgb(106, 129, 237)" }}
                        >
                          Learn More
                        </a>
                      </li>
                    </ul>
                  </article>
                </li>
                <li>
                  <article className="box highlight">
                    <header>
                      <h3>
                        <a href="#">Something of less note</a>
                      </h3>
                    </header>
                    <a href="#" className="image left">
                      <img src="images/pic07.jpg" alt="" />
                    </a>
                    <p>
                      Phasellus sed laoreet massa id justo mattis pharetra.
                      Fusce suscipit ligula vel quam viverra sit amet mollis
                      tortor congue magna lorem ipsum dolor et quisque ut odio
                      facilisis convallis. Etiam non nunc vel est suscipit
                      convallis non id orci. Ut interdum tempus facilisis
                      convallis. Etiam non nunc vel est suscipit convallis non
                      id orci.
                    </p>
                    <ul className="actions">
                      <li>
                        <a
                          href="#"
                          className="button icon solid fa-file"
                          style={{ backgroundColor: "rgb(106, 129, 237)" }}
                        >
                          Learn More
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
