import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindUserPage.scss";
import Swal from "sweetalert2";
import api from "../../utils/api";

function FindUserPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onFindUser = async (e) => {
    e.preventDefault();
    const findCheck = document.getElementById("findCheck");
    findCheck.setAttribute("disabled", true);
    findCheck.innerText = "확인 중...";
    try {
      await api
        .post("/auth/tempPassword?userEmail=" + email)
        .then((response) => {
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "해당 이메일에 임시 비밀번호를 전송했습니다.",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "해당 회원은 존재하지 않습니다.",
            }).then((result) => {
              if (result) {
                findCheck.removeAttribute("disabled");
                findCheck.innerText = "확인";
              }
            });
          }
        });
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title:
            error.response.data.apiError.message.substring(
              0,
              error.response.data.apiError.message.indexOf("!")
            ) + ".",
        }).then((result) => {
          if (result) {
            findCheck.removeAttribute("disabled");
            findCheck.innerText = "확인";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "예기치 못 한 에러가 발생하였습니다.",
        }).then((result) => {
          findCheck.removeAttribute("disabled");
          findCheck.innerText = "확인";
        });
      }
    }
  };

  return (
    <div className="FindUserPage">
      <h1>회원정보 찾기</h1>
      <br />
      <form
        className="findForm"
        onSubmit={(e) => {
          onFindUser(e);
        }}
      >
        <figure className="loginLogo">
          <img src="img/login_logo.png" alt="로그인 로고 이미지" />
        </figure>
        <input
          type={"email"}
          value={email}
          autoComplete="off"
          placeholder="이메일"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <div className="findConfirm">
          <button id="findCheck" type="submit">
            확인
          </button>
        </div>
      </form>
      <p>
        <strong>Note</strong>: 회원가입 시 등록하신 이메일 주소를 입력해 주세요.
        해당 이메일로 비밀번호 정보를 보내드립니다.
      </p>
    </div>
  );
}

export default FindUserPage;
