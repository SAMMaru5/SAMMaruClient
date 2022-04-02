import "./Navigation.scss";
import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate, useLocation} from "react-router-dom";
import { isAuth } from "./../hooks/useAuth"

function Navigation() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  isAuth();

}, [location])


  return (
    <div className="Navigation container">
      <div className="userStatus">
        <p className="attendance">접속자(0명)</p>

        <p className="user" onClick={() => navigate("/login")}>회원가입/로그인</p>
      </div>

      <nav>
        <img
          src="img/logo.png"
          alt="로고 이미지"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <NavDropdown
          title="샘마루"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow1(!show1);
          }}
          onMouseLeave={(e) => {
            setShow1(false);
          }}
          show={show1}
        >
          <div className="navItem1">
            <NavDropdown.Item onClick="4.1">Link 1</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Link 2</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Link 3</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="공지사항"
          className="nav-dropdown"
          onClick={() => navigate("/notice")}
          onMouseEnter={(e) => {
            setShow2(!show2);
          }}
          onMouseLeave={(e) => {
            setShow2(false);
          }}
          show={show2}
        >
          <div className="navItem2">
            <NavDropdown.Item>Link 1</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Link 2</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Link 3</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="자유게시판"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow3(!show3);
          }}
          onMouseLeave={(e) => {
            setShow3(false);
          }}
          show={show3}
        >
          <div className="navItem3">
            <NavDropdown.Item>특강 자료</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">활동보고서</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">소규모프젝</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">족보</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="사진첩"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow4(!show4);
          }}
          onMouseLeave={(e) => {
            setShow4(false);
          }}
          show={show4}
        >
          <div className="navItem4">
            <NavDropdown.Item  onClick={() => navigate("/photo")}>
              Link 1
            </NavDropdown.Item>
            <NavDropdown.Item>
              Link 2
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Link 3</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown
          title="충북대학교"
          className="nav-dropdown"
          onMouseEnter={(e) => {
            setShow5(!show5);
          }}
          onMouseLeave={(e) => {
            setShow5(false);
          }}
          show={show5}
        >
          
          <div className="navItem5">
            <NavDropdown.Item target="_blank" href="https://www.chungbuk.ac.kr/">충북대학교</NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://eis.cbnu.ac.kr/">종합정보시스템</NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://software.cbnu.ac.kr/">소프트웨어학과</NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://sw7up.cbnu.ac.kr/home">SW중심사업단</NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://cbnu.blackboard.com/">ecampus</NavDropdown.Item>
            <NavDropdown.Item target="_blank" href="https://dorm.chungbuk.ac.kr/">기숙사</NavDropdown.Item>

          </div>
        </NavDropdown>
      </nav>
    </div>
  );
}

export default Navigation;