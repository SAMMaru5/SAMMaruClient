import { useEffect } from "react";
import { useState } from "react";
import "./MemberManage.scss";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { delCookie, getCookie } from "../../hooks/useCookie";

function MemberManage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const searchAllUsers = () => {
    api.get("/api/users/info").then((response) => {
      if (response.data.success) {
        setMembers(response.data.response);
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    searchAllUsers();
  }, []);

  const changeAuthority = (id, name, authority, index) => {
    function expiredLogin() {
      Swal.fire({
        title: "로그인 상태 허용 시간이 초과되었습니다.",
        text: "로그인 페이지로 다시 이동하시겠습니까?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }

    let newMeber = [...members];
    newMeber[index].role = authority;

    setMembers(newMeber);
    const authorityKinds = document.getElementsByClassName("authorityKinds");
    authorityKinds[index].value = authority;

    let authorityStr = "미지정으";
    if (authority === "ROLE_ADMIN") {
      authorityStr = "관리자";
    } else if (authority === "ROLE_MEMBER") {
      authorityStr = "회원으";
    }

    Swal.fire({
      icon: "info",
      title: `${name} 사용자의 권한을 ${authorityStr}로 바꾸시겠습니까? `,
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: `아니요`,
    }).then((result) => {
      if (result.isConfirmed) {
        async function getUserInfo() {
          try {
            await api.get("/no-permit/api/user/info").then((response) => {
              api
                .patch("/api/users/" + id + "/role", { role: authority })
                .then((response) => {
                  if (response.data.success) {
                    Swal.fire({
                      icon: "success",
                      title: "권한을 변경하였습니다.",
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "권한 변경에 실패하셨습니다.",
                    }).then((response) => {
                      if (response.isConfirmed) {
                        window.location.replace("/");
                      }
                    });
                  }
                });
            });
          } catch (error) {
            delCookie("SammaruAccessToken");
            expiredLogin();
          }
        }
        if (getCookie("SammaruAccessToken")) getUserInfo();
        else expiredLogin();
      }
    });
  };

  const searchMember = (e) => {
    e.preventDefault();

    if (name === "") {
      searchAllUsers();
    } else {
      api.get("/api/users/detail?username=" + name).then((result) => {
        if (result.data.success) {
          setMembers([result.data.response]);
        } else {
          Swal.fire({
            icon: "info",
            title: name + "회원은 <br/>존재하지 않습니다!",
          });
        }
      });
    }
  };

  return (
    <div id="MemberManage">
      <form className="d-flex align-items-center">
        <input
          className="w-25"
          type={"text"}
          value={name}
          onChange={(res) => {
            setName(res.target.value);
          }}
          placeholder="이름을 입력해주세요."
        ></input>
        <button
          style={{ height: "50px", width: "100px" }}
          className="p-0 mt-3"
          type="submit"
          onClick={(e) => {
            searchMember(e);
          }}
        >
          검색
        </button>
      </form>
      {loading ? (
        <table>
          <colgroup></colgroup>
          <thead>
            <tr>
              <th>이름</th>
              <th>학번</th>
              <th>이메일</th>
              <th>회원권한</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, i) => {
              return (
                <tr key={i}>
                  <td>{member.username}</td>
                  <td>{member.studentId}</td>
                  <td>{member.email}</td>
                  <td>
                    <select
                      className="authorityKinds text-center"
                      value={member.role}
                      onChange={(res) => {
                        changeAuthority(
                          member.userId,
                          member.username,
                          res.target.value,
                          i
                        );
                      }}
                    >
                      <option value="ROLE_TEMP">미지정</option>
                      <option value="ROLE_MEMBER">회원</option>
                      <option value="ROLE_ADMIN">관리자</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table>
          <colgroup></colgroup>
          <thead>
            <tr>
              <th>이름</th>
              <th>학번</th>
              <th>이메일</th>
              <th>회원권한</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>
                <select>
                  <option value="ROLE_TEMP">미지정</option>
                  <option value="ROLE_MEMBER">회원</option>
                  <option value="ROLE_ADMIN">관리자</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MemberManage;
