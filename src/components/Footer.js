import "./Footer.scss";

function Footer() {
  return (
    <section id="footer" style={{ padding: "20px 80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-6 col-6-medium">
            <section>
              <h3>About Us</h3>
              <div className="row">
                <ul className="icons">
                  <li className="icon solid fa-home">
                    충북대학교 소프트웨어학과
                    <br />
                    S4-1 113호
                  </li>
                  <li className="icon solid fa-envelope">
                    (회장) 조희진 &nbsp;&nbsp;(부회장) 주시원
                    <br />
                    (총무) 김성연 &nbsp;&nbsp;(기획) 고영민, 최동진
                    <br />
                    (교육) 이진영 &nbsp;&nbsp;(비품) 조민규
                  </li>
                  <li className="icon solid fa-phone">
                    TEL : 010-2226-5529 &nbsp;(회장)
                    <br />
                    TEL : 010-4388-5415 &nbsp;(부회장)
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col-6 col-6-medium">
            <section>
              <h3>Contributors</h3>
              <div className="row">
                <ul className="icons">
                  <li className="icon solid fa-home">
                    1234 Somewhere Road
                    <br />
                    Nashville, TN 00000
                  </li>
                  <li className="icon solid fa-envelope">
                    (FE) 정원재 박지현 조희진 성열암
                    <br />
                    (BE) 신치용 조광식 안치산 이진영 김영상
                  </li>
                  <li className="icon solid fa-phone">
                    (Front-end) &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    spy03128@naver.com
                    <br />
                    (Back-end/DB) &nbsp; &nbsp;cldydtls@naver.com
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div id="copyright" className="container" style={{ marginTop: "20px" }}>
        <ul className="links">
          <li>&copy; Untitled. All rights reserved.</li>
          <li>
            Dev: <a href="https://github.com/SAMMaru5">SAMMaru</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
