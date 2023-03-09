import "./ModifyPassword.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../utils/api";
import axios from "axios";
import { checkExpiredAccesstoken } from "../../hooks/useAuth";

function ModifyPassword() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ studentId: "", password: "" });
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [currentPasswordRightPattern, setCurrentPasswordRightPattern] =
    useState(-1);
  const [newPasswordRightPattern_1, setNewPasswordRightPattern_1] =
    useState(-1);
  const [newPasswordRightPattern_2, setNewPasswordRightPattern_2] =
    useState(-1);
  const [newPasswordConfirmRightPattern, setNewPasswordConfirmRightPattern] =
    useState(-1);
  const [
    currentPasswordWrongPatternMessage,
    setCurrentPasswordWrongPatternMessage,
  ] = useState("");
  const [samePassword, setSamePassword] = useState(false);

  const currentPasswordInputFocusRef = useRef();
  const newPasswordInputFocusRef = useRef();
  const newPasswordConfirmInputFocusRef = useRef();

  const passwordRegex = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{8,20}.$";

  useEffect(() => {
    api.get("/no-permit/api/user/info").then((response) => {
      setUserInfo({ studentId: response.data.response.studentId });
    });
  }, []);

  const modifyPasswordHandler = (e) => {
    e.preventDefault();

    if (!userInfo.password) {
      setCurrentPasswordWrongPatternMessage("현재 비밀번호를 입력해 주세요");
      setCurrentPasswordRightPattern(0);
      currentPasswordInputFocusRef.current.focus();
      return;
    }

    if (!newPassword) {
      setNewPasswordRightPattern_1(0);
      setNewPasswordRightPattern_2(0);
      newPasswordInputFocusRef.current.focus();
      return;
    } else if (userInfo.password === newPassword) {
      setSamePassword(true);
      return;
    }

    if (!newPasswordConfirm) {
      setNewPasswordConfirmRightPattern(0);
      newPasswordConfirmInputFocusRef.current.focus();
      return;
    }

    checkExpiredAccesstoken().then((response) => {
      if (response) {
        // 로그인 API를 이용하여 현재 비밀번호 란에 입력한 데이터가 올바른지 검증
        axios
          .post(
            process.env.REACT_APP_URL + "/auth/login",
            { ...userInfo },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.success) {
              if (newPassword !== newPasswordConfirm) {
                setNewPasswordConfirmRightPattern(0);
                newPasswordConfirmInputFocusRef.current.focus();
                return;
              }

              api.put("/api/user/password", newPassword).then((response) => {
                Swal.fire({
                  confirmButtonColor: "#4880ee",
                  confirmButtonText: "확인",
                  icon: "success",
                  title: "비밀번호가 정상적으로 \n변경되었습니다.",
                });
                navigate("/");
              });
            }
          })
          .catch((error) => {
            switch (error.response.status) {
              case 401:
                setCurrentPasswordWrongPatternMessage(
                  "현재 비밀번호가 일치하지 않습니다"
                );
                setCurrentPasswordRightPattern(0);
                currentPasswordInputFocusRef.current.focus();
                break;
              default:
                Swal.fire({
                  icon: "error",
                  title: "예기치 못 한 에러가 발생하였습니다.",
                });
            }
          });
      }
    });
  };

  const newPasswordWatcher = (value) => {
    setSamePassword(false);

    if (new RegExp(passwordRegex).test(value)) setNewPasswordRightPattern_1(1);
    else {
      setNewPasswordRightPattern_1(0);
      newPasswordInputFocusRef.current.focus();
    }

    if (value === userInfo.studentId) {
      setNewPasswordRightPattern_2(0);
      currentPasswordInputFocusRef.current.focus();
    } else if (value === "") {
      setNewPasswordRightPattern_2(0);
      currentPasswordInputFocusRef.current.focus();
    } else setNewPasswordRightPattern_2(1);
  };

  const newPasswordConfirmWatcher = (value) => {
    if (value === newPassword) setNewPasswordConfirmRightPattern(1);
    else {
      setNewPasswordConfirmRightPattern(0);
      newPasswordConfirmInputFocusRef.current.focus();
    }
  };

  return (
    <div className="modifyPasswordPage row">
      <div className="col">
        <span className="title">비밀번호 변경</span>
      </div>
      <div className="inputForm col">
        <form onSubmit={(e) => modifyPasswordHandler(e)}>
          <div className="currentPassword">
            <label htmlFor="">현재 비밀번호</label>
            <input
              className={
                currentPasswordRightPattern === -1
                  ? "currentPasswordNonePattern"
                  : "currentPasswordWrongPattern"
              }
              type="password"
              minLength={8}
              maxLength={20}
              ref={currentPasswordInputFocusRef}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
            <div className="currentPasswordPolicy">
              {currentPasswordRightPattern === -1 ? null : (
                <span style={{ color: "#d43a44" }}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ paddingRight: "0.5em" }}
                  />
                  {currentPasswordWrongPatternMessage}
                </span>
              )}
            </div>
          </div>
          <div className="newPassword">
            <label htmlFor="">새 비밀번호</label>
            <input
              className={
                newPasswordRightPattern_1 === -1 ||
                newPasswordRightPattern_2 === -1
                  ? "newPassNonePattern"
                  : newPasswordRightPattern_1 === 1 &&
                    newPasswordRightPattern_2 === 1
                  ? "newPasswordRightPattern"
                  : "newPasswordWrongPattern"
              }
              type="password"
              pattern={passwordRegex}
              minLength={8}
              maxLength={20}
              ref={newPasswordInputFocusRef}
              onChange={(e) => {
                setNewPassword(e.target.value);
                newPasswordWatcher(e.target.value);
              }}
            />
            <div className="newPasswordPolicy">
              {samePassword ? (
                <>
                  <span style={{ color: "#d43a44" }}>
                    <i
                      className="fa-solid fa-xmark"
                      style={{ paddingRight: "0.5em" }}
                    />
                    현재와 동일한 비밀번호는 사용할 수 없습니다
                  </span>
                </>
              ) : (
                <>
                  <div>
                    {newPasswordRightPattern_1 === -1 ? (
                      <span>
                        <i
                          className="fa-solid fa-xmark"
                          style={{
                            paddingRight: "0.5em",
                          }}
                        />
                        영문/숫자/특수문자 1가지 이상 조합(8~20자)
                      </span>
                    ) : newPasswordRightPattern_1 === 1 ? (
                      <span style={{ color: "#3d8730" }}>
                        <i
                          className="fa-solid fa-check"
                          style={{
                            marginLeft: "-0.1rem",
                            paddingRight: "0.25em",
                          }}
                        />
                        영문/숫자/특수문자 1가지 이상 조합(8~20자)
                      </span>
                    ) : (
                      <span style={{ color: "#d43a44" }}>
                        <i
                          className="fa-solid fa-xmark"
                          style={{ paddingRight: "0.5em" }}
                        />
                        영문/숫자/특수문자 1가지 이상 조합(8~20자)
                      </span>
                    )}
                  </div>
                  <div>
                    {newPasswordRightPattern_2 === -1 ? (
                      <span>
                        <i
                          className="fa-solid fa-xmark"
                          style={{
                            paddingRight: "0.5em",
                          }}
                        />
                        아이디(학번) 제외
                      </span>
                    ) : newPasswordRightPattern_2 === 1 ? (
                      <span style={{ color: "#3d8730" }}>
                        <i
                          className="fa-solid fa-check"
                          style={{
                            marginLeft: "-0.1rem",
                            paddingRight: "0.25em",
                          }}
                        />
                        아이디(학번) 제외
                      </span>
                    ) : (
                      <span style={{ color: "#d43a44" }}>
                        <i
                          className="fa-solid fa-xmark"
                          style={{ paddingRight: "0.5em" }}
                        />
                        아이디(학번) 제외
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="newPasswordConfirm">
            <label htmlFor="">비밀번호 다시 입력</label>
            <input
              className={
                newPasswordConfirmRightPattern === -1
                  ? "newPasConfirmNonePattern"
                  : newPasswordConfirmRightPattern === 1
                  ? "newPasswordConfirmRightPattern"
                  : "newPasswordConfirmWrongPattern"
              }
              type={"password"}
              autoComplete="current-password"
              id="userPw"
              minLength={8}
              maxLength={20}
              ref={newPasswordConfirmInputFocusRef}
              onChange={(e) => {
                setNewPasswordConfirm(e.target.value);
                newPasswordConfirmWatcher(e.target.value);
              }}
            />
            <div className="newPasswordConfirmPolicy">
              {newPasswordConfirmRightPattern ===
              -1 ? null : newPasswordConfirmRightPattern === 1 ? (
                <span style={{ color: "#3d8730" }}>
                  <i
                    className="fa-solid fa-check"
                    style={{
                      marginLeft: "-0.1rem",
                      paddingRight: "0.25em",
                    }}
                  />
                  새 비밀번호가 일치합니다
                </span>
              ) : (
                <span style={{ color: "#d43a44" }}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ paddingRight: "0.5em" }}
                  />
                  새 비밀번호가 일치하지 않습니다
                </span>
              )}
            </div>
          </div>
          <button className="changePassword" type="submit">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifyPassword;
