import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RegisterPage.scss";
import Swal from "sweetalert2";
import api from "../../utils/api";

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const agree = location.state;

  // const [informAgree1, setInformAgree1] = useState(true)
  // const [informAgree2, setInformAgree2] = useState(true)

  const [User, setUser] = useState({
    studentId: "",
    username: "",
    password: "",
    email: "",
  });
  const [pwCheck, setPwCheck] = useState("");

  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);
  useEffect(() => {
    if (agree === null) {
      alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
      navigate("/agree");
    }
  }, [navigate, agree]);

  const registerValid = async (e) => {
    e.preventDefault();
    if (User.studentId === "") {
      Swal.fire({
        title: "아이디를 입력해주세요.",
        icon: "warning",
      });
    } else if (User.password !== pwCheck) {
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        icon: "warning",
      });
    } else {
      register();
    }
  };

  const register = async (e) => {
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.setAttribute("disabled", true);
    registerBtn.style.color = "white";
    registerBtn.innerText = "회원가입 중...";

    try {
      await api.post("/auth/signup", User).then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "회원가입에 성공했습니다.",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "회원가입에 실패했습니다.",
          }).then((result) => {
            if (result) {
              registerBtn.removeAttribute("disabled");
              registerBtn.innerText = "회원가입";
            }
          });
        }
      });
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title:
            error.response.data.apiError.message.substring(
              0,
              error.response.data.apiError.message.indexOf("!")
            ) + ".",
          text: "다시 확인해 주세요.",
        }).then((result) => {
          if (result) {
            registerBtn.removeAttribute("disabled");
            registerBtn.innerText = "회원가입";
          }
        });
      }
    }
  };

  const checkStudentnumber = (e) => {
    document.getElementsByClassName("siteInfo")[0].style.display = "flex";
    var regExp = /^[0-9]{4,}$/;
    var stdErr = document.getElementById("stdErr");
    if (e.target.value === "") {
      stdErr.innerHTML = "필수 정보입니다.";
      setFlag1(false);
    } else if (!regExp.test(e.target.value)) {
      stdErr.innerHTML = "학번을 입력해주세요.";
      setFlag1(false);
    } else {
      stdErr.innerHTML = "";
      setFlag1(true);

      if (flag2 && flag3) {
        document.getElementsByClassName("siteInfo")[0].style.display = "none";
      }
    }
  };

  const checkPassword1 = (e) => {
    document.getElementsByClassName("siteInfo")[0].style.display = "flex";
    var regExp = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/;
    var pw1Err = document.getElementById("pw1Err");
    if (e.target.value === "") {
      pw1Err.innerHTML = "필수 정보입니다.";
      setFlag2(false);
    } else if (!regExp.test(e.target.value)) {
      pw1Err.innerHTML = "8~20자 숫자, 영문, 특수문자를 포함해주세요.";
      setFlag2(false);
    } else {
      pw1Err.innerHTML = "";
      setFlag2(true);
      if (flag1 && flag3) {
        document.getElementsByClassName("siteInfo")[0].style.display = "none";
      }
    }
  };

  const checkPassword2 = (e) => {
    document.getElementsByClassName("siteInfo")[0].style.display = "flex";

    var pw2Err = document.getElementById("pw2Err");

    if (e.target.value === "") {
      pw2Err.innerHTML = "필수 정보입니다.";
      setFlag3(false);
    } else if (User.password !== e.target.value) {
      pw2Err.innerHTML = "비밀번호가 일치하지 않습니다..";
      setFlag3(false);
    } else {
      pw2Err.innerHTML = "";
      setFlag3(true);
      if (flag1 && flag2) {
        document.getElementsByClassName("siteInfo")[0].style.display = "none";
      }
    }
  };

  return (
    <div className="RegisterPage container">
      <div className="titleFrame">
        <h5>
          <strong>
            <i className="fas fa-map-marker-alt "></i> &nbsp;정보입력
          </strong>
        </h5>
        <div>
          <Link to={"/"}>Home</Link> &nbsp;/&nbsp; 회원가입 &nbsp;/&nbsp;
          정보입력
        </div>
      </div>
      <hr />
      <form
        onSubmit={(e) => {
          registerValid(e);
        }}
      >
        <table>
          <thead>
            <tr>
              <td colSpan={"3"}>
                <h5>
                  <strong>사이트 정보 입력</strong>
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="textCheck">
                  <label htmlFor="userId">학번</label>
                </div>
                <div className="inputText">
                  <i className="fas fa-user-alt fa-sm"></i>
                  <input
                    type={"text"}
                    autoComplete="off"
                    id="userId"
                    pattern="^[0-9]{4,}$"
                    title="학번을 입력해주세요."
                    required
                    onChange={(e) => {
                      checkStudentnumber(e);
                      setUser({ ...User, studentId: e.target.value });
                    }}
                  ></input>
                  <p className="errMsg" id="stdErr"></p>
                </div>
              </td>
              <td>
                <label htmlFor="userPw">비밀번호</label>

                <div className="inputText">
                  <i className="fas fa-lock fa-sm"></i>
                  <input
                    type={"password"}
                    autoComplete="current-password"
                    id="userPw"
                    title="최소 8자리에서 최대 20자리까지 숫자, 영문, 특수문자 각 1개 이상 포함해주세요."
                    pattern="(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}"
                    required
                    onChange={(e) => {
                      checkPassword1(e);
                      setUser({ ...User, password: e.target.value });
                    }}
                  ></input>
                  <p className="errMsg" id="pw1Err"></p>
                </div>
              </td>
              <td>
                <label htmlFor="userPwCheck">비밀번호 확인</label>
                <div className="inputText">
                  <i className="fas fa-lock fa-sm"></i>
                  <input
                    type={"password"}
                    autoComplete="current-password"
                    id="userPwCheck"
                    required
                    onChange={(e) => {
                      checkPassword2(e);
                      setPwCheck(e.target.value);
                    }}
                  ></input>
                  <p className="errMsg" id="pw2Err"></p>
                </div>
              </td>
            </tr>
            <tr className="siteInfo">
              <td> &nbsp;</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <td colSpan={"3"}>
                <h5>
                  <strong>개인 정보 입력</strong>
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="userName">이름</label>
                <div className="inputText">
                  <i className="fas fa-male fa-sm"></i>
                  <input
                    type={"text"}
                    id="userName"
                    required
                    onChange={(e) => {
                      setUser({ ...User, username: e.target.value });
                    }}
                  ></input>
                  <p className="errMsg" id="nameErr"></p>
                </div>
              </td>
            </tr>
            <tr className="emptyHr">
              <td colSpan={"3"}>
                <hr />
              </td>
            </tr>
            {/* <tr>
                        <td>
                            <div className="textCheck">
                                <label htmlFor="userNickName">닉네임</label><br/>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i className="far fa-smile fa-sm"></i>
                                <input type={"text"} id="userNickName"></input>
                            </div>
                        </td>
                    </tr>
                    <tr className="emptyHr">
                        <td colSpan={"3"}>
                            <p>Note: 공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상) | 닉네임을 바꾸시면 앞으로 0일 이내에는 변경 할 수 없습니다.</p>
                        </td>
                    </tr>
                    <tr className="emptyHr">
                        <td colSpan={"3"}>
                            <hr/>
                        </td>
                    </tr> */}
            <tr>
              <td>
                <div className="textCheck">
                  <label htmlFor="userEmail">이메일</label>
                  <br />
                </div>
                <div className="inputText">
                  <i className="far fa-envelope fa-sm"></i>
                  <input
                    type={"email"}
                    id="userEmail"
                    required
                    onChange={(e) => {
                      setUser({ ...User, email: e.target.value });
                    }}
                  ></input>
                </div>
              </td>
            </tr>
          </tbody>

          {/* <thead>
                    <tr>
                        <td colSpan={"3"}>
                            <h5>
                                <strong>
                                    기타 개인설정
                                </strong>
                            </h5>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={"3"}>
                            <br/>
                            <p>메일링 서비스</p>
                            <label className="checkLabel" htmlFor="informCheck1"><input type={"checkbox"} checked={informAgree1} id="informCheck1" onChange={()=>{setInformAgree1(!informAgree1)}}/> &nbsp; 정보 메일을 받겠습니다.</label>
                            <hr/>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={"3"}>
                            <p>정보 공개</p>
                            <label className="checkLabel" htmlFor="informCheck2"><input type={"checkbox"} checked={informAgree2} id="informCheck2" onChange={()=>{setInformAgree2(!informAgree2)}}/> &nbsp; 다른 분들이 나의 정보를 볼 수 있도록 합니다.</label>
                            <p className="informVisible">
                                Note: 정보공개를 바꾸시면 앞으로 0일 이내에는 변경이 안됩니다.
                            </p>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <p>자동등록방지</p>
                            <div className="autoNum">

                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={"3"}>
                            <p>자동등록방지</p>
                            <div className="autoNum">

                            </div>
                        </td>
                    </tr>
                </tbody> */}
          <thead>
            <tr>
              <td colSpan={"3"}>
                <button id="registerBtn" type="submit">
                  <h5>회원가입</h5>
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </form>
    </div>
  );
}

export default RegisterPage;
