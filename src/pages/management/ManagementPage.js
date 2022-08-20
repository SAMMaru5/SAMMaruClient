import "./ManagementPage.scss";
import ScheduleManage from "./ScheduleManage";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import BoardManage from "./BoardManage";
import MemberManage from "./MemberManage";
import { myRole } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ManagementPage() {
  const navigate = useNavigate()

  useEffect(() => {
    myRole().then((response)=>{
      if (response !== "admin"){
        Swal.fire({
          icon: "error",
          title: "로그인이 필요합니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    })

  }, [navigate])
  

  const [visible, setVisible] = useState("hidden");
  const isSchedule = (event) => {
    if (event.target.id === "left-tabs-tab-second") {
      setVisible("visible");
    } else {
      setVisible("hidden");
    }
  };



  return (
    <div className="ManagementPage">
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row>
          <Col lg={2} className="sideNav">
            <Nav
              variant="pills"
              className="flex-column"
              onClick={(e) => {
                isSchedule(e);
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="first">&nbsp;메인페이지 관리</Nav.Link>
              </Nav.Item>
              <Nav.Item id="nav-link">
                <Nav.Link eventKey="second">&nbsp;스케쥴 관리</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">&nbsp;&nbsp;게시판 관리</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">&nbsp;&nbsp;회원 관리</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">&nbsp;&nbsp;기타 관리</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <h1>메인 페이지 관리</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                {/* Fullcalendar API는 rendering 시 적용되지 않는 관계로 hidden으로 관리 */}
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <h1>게시판 관리</h1>
                <BoardManage />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <h1>회원 관리</h1>
                <MemberManage/>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <h1>기타 관리</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <ScheduleManage visible={visible} />
    </div>
  );
}

export default ManagementPage;
