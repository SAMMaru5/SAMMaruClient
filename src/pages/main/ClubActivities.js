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
              <a href="#!" className="image featured">
                <img src={img1} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>개강총회</h3>
              </header>
              <p>
                개강 시기에 맞추어서 동아리간의 화합을 위해 <br />
                <strong>개강총회</strong>를 진행했습니다.
              </p>
            </section>
          </div>
          <div className="col-4 col-6-medium col-12-small">
            <section>
              <a href="#!" className="image featured">
                <img src={img2} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>Membership Training</h3>
              </header>
              <p>
                동아리원들간의 친화력을 높이기 위해 <br />
                Membership Training을 진행하고 있습니다.
              </p>
            </section>
          </div>
          <div className="col-4 col-6-medium col-12-small">
            <section>
              <a href="#!" className="image featured">
                <img src={img3} alt="" style={{ height: "100%" }} />
              </a>
              <header>
                <h3>소규모 프로젝트</h3>
              </header>
              <p>
                우리 동아리는 1,2학년 동아리원들의{" "}
                <strong>프로젝트 능력 향상</strong>을 위해서 <br />
                소규모 프로젝트를 진행하고 있습니다.
              </p>
            </section>
          </div>
          <div className="col-12">
            <ul className="actions">
              <li>
                <a
                  href="#!"
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
