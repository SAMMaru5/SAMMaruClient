import "./LoginPage.scss";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ studentId: "", password: "" });
  const [showStudentNumInputDeleteBtn, setShowStudentNumInputDeleteBtn] =
    useState(false);
  const [showPasswordInputDeleteBtn, setShowPasswordInputDeleteBtn] =
    useState(false);
  const [studentNumInputFocused, setStudentNumInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

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

  return (
    <div className="LoginPage">
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
            <div
              className={
                studentNumInputFocused ? "studentNum focused" : "studentNum"
              }
            >
              <i className="userIcon fa-solid fa-user"></i>
              <input
                className="studentNumInput"
                type={"text"}
                autoComplete="username"
                placeholder="학번"
                required
                autoFocus
                value={user.studentId}
                onFocus={() => setStudentNumInputFocused(true)}
                onBlur={() => setStudentNumInputFocused(false)}
                onClick={(e) => {
                  if (user.studentId !== "")
                    setShowStudentNumInputDeleteBtn(true);
                }}
                onChange={(e) => {
                  if (e.target.value === "")
                    setShowStudentNumInputDeleteBtn(false);
                  else if (e.target.value !== "") {
                    setShowStudentNumInputDeleteBtn(true);
                  }
                  setUser({ ...user, studentId: e.target.value });
                }}
              ></input>
              {showStudentNumInputDeleteBtn ? (
                <div
                  onClick={(e) => {
                    setUser({
                      ...user,
                      studentId: "",
                    });
                    setShowStudentNumInputDeleteBtn(false);
                  }}
                  className="studentNumDeleteBtn fa-solid fa-solid fa-circle-xmark"
                ></div>
              ) : null}
            </div>
          </div>

          <div className="passwordForm">
            <div
              className={passwordInputFocused ? "password focused" : "password"}
            >
              <i className="lockIcon fa-solid fa-lock"></i>
              <input
                className="passwordInput"
                type={"password"}
                autoComplete="current-password"
                placeholder="비밀번호"
                required
                value={user.password}
                onFocus={() => setPasswordInputFocused(true)}
                onBlur={() => setPasswordInputFocused(false)}
                onClick={() => {
                  if (user.password !== "") setShowPasswordInputDeleteBtn(true);
                }}
                onChange={(e) => {
                  if (e.target.value === "")
                    setShowPasswordInputDeleteBtn(false);
                  else if (e.target.value !== "") {
                    setShowPasswordInputDeleteBtn(true);
                  }
                  setUser({ ...user, password: e.target.value });
                }}
              ></input>
              {showPasswordInputDeleteBtn ? (
                <div
                  onClick={(e) => {
                    setUser({
                      ...user,
                      password: "",
                    });
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
