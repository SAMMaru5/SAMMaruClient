import "./CheckPwPage.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../utils/api";
import axios from "axios";
import { checkExpiredAccesstoken } from "../../hooks/useAuth";

function CheckPwPage() {
  const navigate = useNavigate();

  const [User, setUser] = useState({ studentId: "", password: "" });
  const [UserInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/no-permit/api/user/info").then((response) => {
      setUser({ studentId: response.data.response.studentId });
      setUserInfo(response.data.response);
      setLoading((prev) => !prev);
    });
  }, []);

  function passwordCheck(e) {
    e.preventDefault();
    checkExpiredAccesstoken().then((response) => {
      if (response) {
        const checkPwBtn = document.getElementById("checkPwBtn");
        checkPwBtn.setAttribute("disabled", true);
        checkPwBtn.innerText = "확인 중...";
        checkPwBtn.style.color = "white";
        //로그인 call
        axios
          .post(
            process.env.REACT_APP_URL + "/auth/login",
            { ...User },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.success)
              navigate("/modifyUserInfo", { state: true });
          })
          .catch((error) => {
            if (error.response.status === 401) {
              Swal.fire({
                icon: "error",
                title: "현재 비밀번호와 일치하지 않습니다.",
              }).then((result) => {
                if (result) {
                  checkPwBtn.removeAttribute("disabled");
                  checkPwBtn.innerText = "확인";
                }
              });
            }
          });
      }
    });
  }

  return (
    <div className="CheckPwPage container">
      <div className="titleFrame">
        <h5>
          <strong>
            <i className="fas fa-map-marker-alt "></i> &nbsp;회원 비밀번호 확인
          </strong>
        </h5>
        <div>
          <Link to={"/"}>Home</Link> &nbsp;/&nbsp; 정보수정
        </div>
      </div>
      <hr />
      <form
        onSubmit={(e) => {
          passwordCheck(e);
        }}
      >
        <table>
          <thead>
            <tr>
              <td colSpan={"3"}>
                <h5>
                  <strong>회원 비밀번호 입력</strong>
                </h5>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="titleText">비밀번호를 한번 더 입력해주세요.</p>
                <p className="titleText">
                  Note :{" "}
                  <span>
                    {" "}
                    회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번 더
                    확인합니다.{" "}
                  </span>
                </p>
                <hr />
              </td>
            </tr>

            <tr>
              <td>
                <p className="titleText">
                  회원 아이디 :{" "}
                  <span className="uId">
                    {loading ? UserInfo.studentId : null}
                  </span>
                </p>
                <hr />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="userPw" className="titleText">
                  비밀번호
                </label>
                <br />

                <div className="inputText">
                  <i className="fas fa-lock fa-lg"></i>
                  <input
                    type={"password"}
                    autoComplete="current-password"
                    id="userPw"
                    title="최소 8자리에서 최대 20자리까지 숫자, 영문, 특수문자 각 1개 이상 포함해주세요."
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$"
                    required
                    onChange={(e) => {
                      setUser({ ...User, password: e.target.value });
                    }}
                  ></input>
                </div>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td colSpan={"3"}>
                <button id="checkPwBtn" type="submit">
                  <h5>확인</h5>
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </form>
      <div className="mainBtn">
        <button type="button" onClick={() => navigate("/")}>
          <h5>메인으로 돌아가기</h5>
        </button>
      </div>
    </div>
  );
}

export default CheckPwPage;
