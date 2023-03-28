import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./RegisterPage.scss";
import Swal from "sweetalert2";
import api from "../../utils/api";

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const agree = location.state;

  const PATTERN_NONE = "patternNone";
  const PATTERN_HIDDEN = "patternHidden";
  const PATTERN_WRONG = "patternWrong";
  const PATTERN_RIGHT = "patternRight";
  const WRONG_CASE_BORDER = "wrongCaseBorder";
  const RIGHT_CASE_BORDER = "rightCaseBorder";

  const [userInfo, setUserInfo] = useState({
    studentId: "",
    username: "",
    password: "",
    email: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [passwordPolicy_className, setPasswordPolicy_className] =
    useState(PATTERN_NONE);
  const [passwordPolicy2_className, setPasswordPolicy2_className] =
    useState(PATTERN_NONE);
  const [passwordConfirmPolicy_className, setPasswordConfirmPolicy_className] =
    useState(PATTERN_HIDDEN);
  const [emailPolicy_className, setEmailPolicy_className] =
    useState(PATTERN_HIDDEN);
  const [
    emailConfirmCodeVerifyingPolicy_className,
    setEmailConfirmCodeVerifyingPolicy_className,
  ] = useState(PATTERN_HIDDEN);

  const [verifiedEmailAddress, setVerifiedEmailAddress] = useState("");

  const nameInputFocusRef = useRef(null);
  const studentIdInputFocusRef = useRef(null);
  const passwordInputFocusRef = useRef(null);
  const passwordConfirmInputFocusRef = useRef(null);
  const emailInputFocusRef = useRef(null);
  const emailConfirmCodeVerifyingInputFocusRef = useRef(null);

  const passwordRegex = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{8,20}.$";
  const studentIdRegex = "^[0-9]{6,}$";
  const emailRegex = "[a-zA-Z0-9._-]+@[a-z]+.+[a-z]+";

  useEffect(() => {
    if (agree === null) {
      Toast.fire({
        icon: "warning",
        title: "회원가입 약관의 내용에 동의하셔야 회원가입을 하실 수 있습니다",
        timer: 4000,
      });
      navigate("/agree");
    }
  }, [navigate, agree]);

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const registerValid = () => {
    // 회원가입 컴포넌트 내 입력란 (공란/유효값 검증) 확인 조건문
    if (userInfo.username === undefined || userInfo.username === "") {
      nameInputFocusRef.current.className = WRONG_CASE_BORDER;
      nameInputFocusRef.current.focus();
      alert("성명을 입력해 주세요");
    } else if (userInfo.studentId === undefined || userInfo.studentId === "") {
      studentIdInputFocusRef.current.className = WRONG_CASE_BORDER;
      studentIdInputFocusRef.current.focus();
      alert("학번을 입력해 주세요");
    } else if (!new RegExp(studentIdRegex).test(userInfo.studentId)) {
      studentIdInputFocusRef.current.className = WRONG_CASE_BORDER;
      studentIdInputFocusRef.current.focus();
      alert("올바른 학번을 입력해 주세요");
    } else if (userInfo.password === undefined || userInfo.password === "") {
      passwordInputFocusRef.current.className = WRONG_CASE_BORDER;
      passwordInputFocusRef.current.focus();
      setPasswordPolicy_className(PATTERN_WRONG);
      setPasswordPolicy2_className(PATTERN_WRONG);
      alert("비밀번호를 입력해 주세요");
    } else if (
      passwordPolicy_className === PATTERN_WRONG ||
      passwordPolicy2_className === PATTERN_WRONG
    ) {
      passwordInputFocusRef.current.className = WRONG_CASE_BORDER;
      passwordInputFocusRef.current.focus();
    } else if (passwordConfirm === undefined || passwordConfirm === "") {
      passwordConfirmInputFocusRef.current.className = WRONG_CASE_BORDER;
      passwordConfirmInputFocusRef.current.focus();
      setPasswordConfirmPolicy_className(PATTERN_WRONG);
    } else if (userInfo.password !== passwordConfirm) {
      setPasswordConfirmPolicy_className(PATTERN_WRONG);
      passwordConfirmInputFocusRef.current.className = WRONG_CASE_BORDER;
    } else if (passwordConfirmPolicy_className === PATTERN_WRONG) {
      passwordConfirmInputFocusRef.current.className = WRONG_CASE_BORDER;
      passwordConfirmInputFocusRef.current.focus();
    } else if (userInfo.email === undefined || userInfo.email === "") {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("사용하실 이메일 주소를 입력해 주세요");
    } else if (emailPolicy_className === PATTERN_WRONG) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
    } else if (emailPolicy_className === PATTERN_HIDDEN) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("인증번호 요청을 완료해 주세요");
      return;
    } else if (verificationCode === undefined || verificationCode === "") {
      emailConfirmCodeVerifyingInputFocusRef.current.className =
        WRONG_CASE_BORDER;
      emailConfirmCodeVerifyingInputFocusRef.current.focus();
      alert("인증번호를 입력해 주세요");
    } else if (emailConfirmCodeVerifyingPolicy_className === PATTERN_HIDDEN) {
      emailConfirmCodeVerifyingInputFocusRef.current.className =
        WRONG_CASE_BORDER;
      emailConfirmCodeVerifyingInputFocusRef.current.focus();
      alert("인증번호 확인을 완료해 주세요");
    } else if (emailConfirmCodeVerifyingPolicy_className === PATTERN_WRONG) {
      emailConfirmCodeVerifyingInputFocusRef.current.className =
        WRONG_CASE_BORDER;
      emailConfirmCodeVerifyingInputFocusRef.current.focus();
    } else if (userInfo.email !== verifiedEmailAddress) {
      setEmailPolicy_className(PATTERN_HIDDEN);
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      setEmailConfirmCodeVerifyingPolicy_className(PATTERN_HIDDEN);
      emailConfirmCodeVerifyingInputFocusRef.current.value = "";
      alert("인증번호 요청을 완료해 주세요");
    } else {
      register();
    }
  };

  const register = async () => {
    await api
      .post(`/auth/signup`, userInfo)
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: `회원가입 완료`,
            text: "홈페이지 하단에 표시된 연락처를 통하여 회원 권한을 요청해 주세요",
            confirmButtonColor: "#4880ee",
            confirmButtonText: "확인",
          }).then((response) => {
            navigate("/login");
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        switch (error.response.status) {
          case 409:
            studentIdInputFocusRef.current.className = WRONG_CASE_BORDER;
            studentIdInputFocusRef.current.focus();
            Toast.fire({
              icon: "warning",
              title: "해당 학번의 사용자가 이미 존재합니다",
            });
            break;
          default:
            alert("예기치 못 한 에러가 발생하였습니다.\n" + error);
        }
      });
  };

  const passwordWatcher = (value) => {
    if (new RegExp(passwordRegex).test(value)) {
      setPasswordPolicy_className(PATTERN_RIGHT);
      passwordInputFocusRef.current.className = RIGHT_CASE_BORDER;
    } else {
      setPasswordPolicy_className(PATTERN_WRONG);
      passwordInputFocusRef.current.className = WRONG_CASE_BORDER;
    }

    if (userInfo.studentId === value || value === "")
      setPasswordPolicy2_className(PATTERN_WRONG);
    else setPasswordPolicy2_className(PATTERN_RIGHT);
  };

  const passwordConfirmWatcher = (value) => {
    if (userInfo.password !== value || value === "") {
      setPasswordConfirmPolicy_className(PATTERN_WRONG);
      passwordConfirmInputFocusRef.current.className = WRONG_CASE_BORDER;
    } else {
      setPasswordConfirmPolicy_className(PATTERN_RIGHT);
      passwordConfirmInputFocusRef.current.className = RIGHT_CASE_BORDER;
    }
  };

  const emailConfirmCodeSendingHandler = async () => {
    if (userInfo.email === "") {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("사용하실 이메일 주소를 입력해 주세요");
      return;
    } else if (!new RegExp(emailRegex).test(userInfo.email)) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("올바른 이메일 주소를 입력해 주세요");
      return;
    }
    Toast.fire({
      icon: "info",
      title: "시스템에서 메일을 전송하고 있습니다",
      timer: 5000,
    });
    setEmailConfirmCodeVerifyingPolicy_className(PATTERN_HIDDEN);
    await api
      .post(`/auth/send?userEmail=${userInfo.email}`)
      .then((response) => {
        if (response.data.success) {
          setEmailPolicy_className(PATTERN_RIGHT);
          emailInputFocusRef.current.className = RIGHT_CASE_BORDER;
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 409:
            Swal.close();
            setEmailPolicy_className(PATTERN_WRONG);
            emailInputFocusRef.current.className = WRONG_CASE_BORDER;
            emailInputFocusRef.current.focus();
            break;
          default:
            alert("예기치 못 한 에러가 발생하였습니다.\n" + error);
        }
      });
  };

  const emailConfirmCodeVerifyingHandler = async () => {
    if (userInfo.email === undefined || userInfo.email === "") {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("사용하실 이메일을 입력하신 후 인증번호 요청을 완료해 주세요");
      return;
    } else if (emailPolicy_className === PATTERN_HIDDEN) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      alert("인증번호 요청을 완료해 주세요");
      return;
    } else if (emailPolicy_className === PATTERN_WRONG) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("다른 이메일 주소를 입력하신 후 인증번호 요청을 완료해 주세요");
      return;
    } else if (!new RegExp(emailRegex).test(userInfo.email)) {
      emailInputFocusRef.current.className = WRONG_CASE_BORDER;
      emailInputFocusRef.current.focus();
      alert("올바른 이메일 주소를 입력하신 후 인증번호 요청을 완료해 주세요");
      return;
    } else if (verificationCode === undefined || verificationCode === "") {
      emailConfirmCodeVerifyingInputFocusRef.current.className =
        WRONG_CASE_BORDER;
      emailConfirmCodeVerifyingInputFocusRef.current.focus();
      alert("인증번호를 입력해 주세요");
      return;
    } else if (emailPolicy_className === PATTERN_HIDDEN) {
      emailConfirmCodeVerifyingInputFocusRef.current.className =
        WRONG_CASE_BORDER;
      emailConfirmCodeVerifyingInputFocusRef.current.focus();
      alert("인증번호 요청을 완료해 주세요");
      return;
    }

    await api
      .post(`/auth/verify`, { verificationCode })
      .then((response) => {
        if (response.data.success) {
          emailConfirmCodeVerifyingInputFocusRef.current.className =
            RIGHT_CASE_BORDER;
          setEmailConfirmCodeVerifyingPolicy_className(PATTERN_RIGHT);
          setVerifiedEmailAddress(userInfo.email);
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            setEmailConfirmCodeVerifyingPolicy_className(PATTERN_WRONG);
            emailConfirmCodeVerifyingInputFocusRef.current.className =
              WRONG_CASE_BORDER;
            emailConfirmCodeVerifyingInputFocusRef.current.focus();
            break;
          default:
            console.log("에러: ", error);
        }
      });
  };

  return (
    <div className="RegisterPage container">
      <div className="inputForm">
        <div className="titleFrame">
          <h5 className="formTitle">정보입력</h5>
          <div className="routePath">
            <Link to={"/"} className="link">
              홈
            </Link>{" "}
            &nbsp;/&nbsp;{" "}
            <Link to={"/agree"} className="link">
              약관동의
            </Link>{" "}
            &nbsp;/&nbsp; 정보입력
          </div>
        </div>
        <div>
          <div className="studentInfo">
            <span className="title">학생정보</span>
            <div className="contentSection">
              <div className="eachContent">
                <label htmlFor="">성명</label>
                <input
                  type="text"
                  required
                  ref={nameInputFocusRef}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, username: e.target.value });
                  }}
                />
              </div>
              <div className="eachContent">
                <label htmlFor="">학번(아이디)</label>
                <input
                  type="text"
                  ref={studentIdInputFocusRef}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, studentId: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="password">
            <span className="title">비밀번호 입력 </span>
            <div className="contentSection">
              <div className="eachContent">
                <label htmlFor="">비밀번호</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={20}
                  ref={passwordInputFocusRef}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                    passwordWatcher(e.target.value);
                  }}
                />
              </div>
              <div className={"eachContent " + passwordPolicy_className}>
                <span>
                  {passwordPolicy_className === PATTERN_RIGHT ? (
                    <i
                      className="fa-solid fa-check"
                      style={{
                        marginLeft: "-0.1rem",
                        paddingRight: "0.25em",
                      }}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-xmark"
                      style={{ paddingRight: "0.5em" }}
                    />
                  )}
                  영문/숫자/특수문자 1가지 이상 조합(8~20자)
                </span>
              </div>
              <div className={"eachContent " + passwordPolicy2_className}>
                <span>
                  {passwordPolicy2_className === PATTERN_RIGHT ? (
                    <i
                      className="fa-solid fa-check"
                      style={{
                        marginLeft: "-0.1rem",
                        paddingRight: "0.25em",
                      }}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-xmark"
                      style={{ paddingRight: "0.5em" }}
                    />
                  )}
                  아이디(학번) 제외
                </span>
              </div>
              <div className="eachContent">
                <label htmlFor="">비밀번호 재확인</label>
                <input
                  type="password"
                  ref={passwordConfirmInputFocusRef}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    passwordConfirmWatcher(e.target.value);
                  }}
                />
              </div>
              <div className={"eachContent " + passwordConfirmPolicy_className}>
                <span>
                  {passwordConfirmPolicy_className === PATTERN_RIGHT ? (
                    <>
                      <i
                        className="fa-solid fa-check"
                        style={{
                          marginLeft: "-0.1rem",
                          paddingRight: "0.25em",
                        }}
                      />
                      입력된 비밀번호가 일치합니다.
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-xmark"
                        style={{ paddingRight: "0.5em" }}
                      />
                      입력된 비밀번호가 일치하지 않습니다
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="email">
            <span className="title">이메일 정보</span>
            <div className="contentSection">
              <div className="eachContent">
                <label htmlFor="">이메일 주소</label>
                <input
                  type="text"
                  ref={emailInputFocusRef}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, email: e.target.value });
                  }}
                />
                <button
                  className="emailConfirmCodeSendingBtn"
                  type="button"
                  onClick={() => {
                    emailConfirmCodeSendingHandler();
                  }}
                >
                  인증번호 요청
                </button>
              </div>
              <div className={"eachContent " + emailPolicy_className}>
                <span>
                  {emailPolicy_className === PATTERN_RIGHT ? (
                    <>
                      <i
                        className="fa-solid fa-check"
                        style={{
                          marginLeft: "-0.1rem",
                          paddingRight: "0.25em",
                        }}
                      />
                      해당 메일로 인증번호가 발송되었습니다
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-xmark"
                        style={{ paddingRight: "0.5em" }}
                      />
                      이미 사용 중인 이메일 주소입니다
                    </>
                  )}
                </span>
              </div>
              <div className="eachContent">
                <label htmlFor="">인증번호 확인</label>
                <input
                  type="text"
                  ref={emailConfirmCodeVerifyingInputFocusRef}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
                <button
                  className="emailConfirmCodeVerifyingBtn"
                  type="button"
                  onClick={() => {
                    emailConfirmCodeVerifyingHandler();
                  }}
                >
                  확인
                </button>
              </div>
              <div
                className={
                  "eachContent " + emailConfirmCodeVerifyingPolicy_className
                }
              >
                <span>
                  {emailConfirmCodeVerifyingPolicy_className ===
                  PATTERN_RIGHT ? (
                    <>
                      <i
                        className="fa-solid fa-check"
                        style={{
                          marginLeft: "-0.1rem",
                          paddingRight: "0.25em",
                        }}
                      />
                      이메일 인증을 완료하였습니다
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-xmark"
                        style={{ paddingRight: "0.5em" }}
                      />
                      인증번호가 올바르지 않습니다
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="registerBtn"
          onClick={() => {
            registerValid();
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
