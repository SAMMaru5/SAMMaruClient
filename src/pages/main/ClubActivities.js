import "./ClubActivities.scss";

import img1 from "../../imgs/img1.jpg";
import img2 from "../../imgs/img2.jpg";
import img3 from "../../imgs/img3.jpg";

function ClubActivities() {
  return (
    <section id="features">
      <div className="container">
        <header>
          <h2>
            S A M M a r u <strong> 추 억 필 름</strong>
          </h2>
        </header>
        <div className="row aln-center">
          <div className="col-4 col-6-medium col-12-small">
            <section>
              <a href="#" className="image featured">
                <img src={img1} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>개강총회</h3>
              </header>
              <p>
                This is <strong>Strongly Typed</strong>, a free, fully
                responsive site template by
                <a href="http://html5up.net">HTML5 UP</a>. Free for personal and
                commercial use under the
                <a href="http://html5up.net/license">CCA 3.0 license</a>.
              </p>
            </section>
          </div>
          <div className="col-4 col-6-medium col-12-small">
            <section>
              <a href="#" className="image featured">
                <img src={img2} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>Membership Training</h3>
              </header>
              <p>
                <a href="http://html5up.net">HTML5 UP</a> is a side project of
                <a href="http://twitter.com/ajlkn">AJ’s</a> (= me). I started it
                as a way to both test my responsive tools and sharpen up my
                coding and design skills a bit.
              </p>
            </section>
          </div>
          <div className="col-4 col-6-medium col-12-small">
            <section>
              <a href="#" className="image featured">
                <img src={img3} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>소규모 프로젝트</h3>
              </header>
              <p>
                <strong>Responsive Tools</strong> is a simple set of tools for
                building responsive sites and apps. All of my templates at
                <a href="http://html5up.net">HTML5 UP</a> are built using these
                tools.
              </p>
            </section>
          </div>
          <div className="col-12">
            <ul className="actions">
              <li>
                <a
                  href="#"
                  className="button icon solid fa-file"
                  style={{ backgroundColor: "#6a81ed" }}
                >
                  More
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClubActivities;
