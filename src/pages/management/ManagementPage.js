import "./ManagementPage.scss";
import Calendar from "./Calendar";
import {Tab, Row, Col, Nav} from 'react-bootstrap';
function ManagementPage() {
  return (
    <div className="ManagementPage">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col lg={2} className="sideNav">
                  <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                      <Nav.Link eventKey="first">&nbsp;메인 페이지 관리</Nav.Link>
                    </Nav.Item>
                    <Nav.Item id="nav-link">
                      <Nav.Link eventKey="second">스케쥴 관리</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="third">&nbsp;&nbsp;기타 관리</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col lg={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">

                      <h1>메인 페이지 관리</h1>

                    </Tab.Pane>
                    <Tab.Pane eventKey="second">

                      <Calendar />


                    </Tab.Pane>
                    <Tab.Pane eventKey="third">

                      <h1>기타 관리</h1>

                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
        
    </div>
  );
}

export default ManagementPage;
