import "./LoginPage.scss";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [isInit, setIsInit] = useState(false);
  const [user, setUser] = useState({ studentId: "", password: "" });
  const [showStudentNumInputDeleteBtn, setShowStudentNumInputDeleteBtn] =
    useState(false);
  const [showPasswordInputDeleteBtn, setShowPasswordInputDeleteBtn] =
    useState(false);
  const studentNumInputWidthChange = useRef(null);
  const passwordInputWidthChange = useRef(null);

  const onLogin = (e) => {
    e.preventDefault();
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.setAttribute("disabled", true);
    loginBtn.innerText = "로그인 중...";

    axios
      .post(
        process.env.REACT_APP_URL + "/auth/login",
        { ...user },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(
            "sm-accessToken",
            response.data.response.accessToken
          );
          localStorage.setItem(
            "sm-refreshToken",
            response.data.response.refreshToken
          );
          localStorage.setItem(
            "sm-expired",
            response.data.response.accessTokenExpiresTime
          );

          Swal.fire({
            icon: "success",
            title: "로그인에 성공하셨습니다.",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: error.response.data.apiError.message,
          }).then((result) => {
            if (result) {
              loginBtn.removeAttribute("disabled");
              loginBtn.innerText = "로그인";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "로그인에 실패하였습니다. 다시 시도해주세요.",
          }).then((result) => {
            if (result) {
              loginBtn.removeAttribute("disabled");
              loginBtn.innerText = "로그인";
            }
          });
        }
      });
  };

  const inputWidthChangeHandler = (idx) => {
    try {
      switch (idx) {
        case 0:
          studentNumInputWidthChange.current.style = "width: 15.5rem;";
          passwordInputWidthChange.current.style = "width: 15.5rem;";
          break;
        case 1:
          studentNumInputWidthChange.current.style = "width: 15.5rem;";
          break;
        case 2:
          passwordInputWidthChange.current.style = "width: 15.5rem;";
          break;
        default:
          console.error("wrong idx value came!");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div
      className="LoginPage"
      onClick={() => {
        setIsInit(true);
        inputWidthChangeHandler(0);
        if (studentNumInputWidthChange.current.value !== "")
          setShowStudentNumInputDeleteBtn(true);
        if (passwordInputWidthChange.current.value !== "")
          setShowPasswordInputDeleteBtn(true);
      }}
      onKeyDown={(e) => {
        if (e.keyCode === undefined) return;
        setIsInit(true);
        inputWidthChangeHandler(0);
        if (studentNumInputWidthChange.current.value !== "")
          setShowStudentNumInputDeleteBtn(true);
        if (passwordInputWidthChange.current.value !== "")
          setShowPasswordInputDeleteBtn(true);
      }}
    >
      <div className="loginFrame">
        <form
          className="loginForm"
          style={{
            margin: "0 1.5rem",
          }}
          onSubmit={(e) => {
            onLogin(e);
          }}
        >
          <figure className="loginLogo" style={{ marginBottom: "0" }}>
            <img src="img/login_logo.png" alt="로그인 로고 이미지" />
          </figure>
          <div className="studentNumForm">
            <input
              className="studentNumInput"
              type={"text"}
              autoComplete="username"
              placeholder="학번"
              required
              autoFocus
              ref={studentNumInputWidthChange}
              onFocus={() => {
                inputWidthChangeHandler(0);
              }}
              onBlur={() => {
                if (studentNumInputWidthChange.current.value !== "")
                  inputWidthChangeHandler(1);
                if (passwordInputWidthChange.current.value !== "")
                  inputWidthChangeHandler(2);
              }}
              onClick={() => {
                if (studentNumInputWidthChange.current.value === "")
                  setShowStudentNumInputDeleteBtn(false);
                else setShowStudentNumInputDeleteBtn(true);
              }}
              onChange={(e) => {
                if (e.target.value === "")
                  setShowStudentNumInputDeleteBtn(false);
                else if (e.target.value !== "" && isInit) {
                  setShowStudentNumInputDeleteBtn(true);
                }
                setUser({ ...user, studentId: e.target.value });
              }}
            ></input>
            <div className="studentNum">
              <i className="userIcon fa-solid fa-user"></i>
              {showStudentNumInputDeleteBtn ? (
                <div
                  onClick={(e) => {
                    studentNumInputWidthChange.current.value = "";
                    setShowStudentNumInputDeleteBtn(false);
                  }}
                  className="studentNumDeleteBtn fa-solid fa-solid fa-circle-xmark"
                ></div>
              ) : null}
            </div>
          </div>

          <div className="passwordForm">
            <input
              className="passwordInput"
              type={"password"}
              autoComplete="current-password"
              placeholder="비밀번호"
              required
              ref={passwordInputWidthChange}
              onFocus={() => {
                inputWidthChangeHandler(0);
              }}
              onBlur={() => {
                if (studentNumInputWidthChange.current.value !== "")
                  inputWidthChangeHandler(1);
                if (passwordInputWidthChange.current.value !== "")
                  inputWidthChangeHandler(2);
              }}
              onClick={() => {
                if (passwordInputWidthChange.current.value === "")
                  setShowPasswordInputDeleteBtn(false);
                else setShowPasswordInputDeleteBtn(true);
              }}
              onChange={(e) => {
                if (e.target.value === "") setShowPasswordInputDeleteBtn(false);
                else if (e.target.value !== "" && isInit) {
                  setShowPasswordInputDeleteBtn(true);
                }
                setUser({ ...user, password: e.target.value });
              }}
            ></input>
            <div className="password">
              <i className="lockIcon fa-solid fa-lock"></i>
              {showPasswordInputDeleteBtn ? (
                <div
                  onClick={(e) => {
                    passwordInputWidthChange.current.value = "";
                    setShowPasswordInputDeleteBtn(false);
                  }}
                  className="passwordDeleteBtn fa-solid fa-solid fa-circle-xmark"
                ></div>
              ) : null}
            </div>
          </div>

          <button id="loginBtn" type="submit">
            로그인
          </button>
          <div className="loginLink">
            <Link to="/agree" className="signUp">
              회원가입
            </Link>
            <Link to="/findUser" className="findPassword">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
