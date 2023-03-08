import { useEffect } from "react";
import { useState } from "react";
import "./MemberManage.scss";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { checkExpiredAccesstoken } from "../../hooks/useAuth";

function MemberManage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const searchAllUsers = () => {
    setMembers([]);
    api.get("/api/users/info").then((response) => {
      if (response.data.success) {
        response.data.response.map((eachMemberInfo, idx) => {
          setMembers((prevMembers) => [
            ...prevMembers,
            {
              ...eachMemberInfo,
              userInfoModifyMode: false,
            },
          ]);
        });
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    searchAllUsers();
  }, []);

  const changeAuthority = (id, name, authority, index) => {
    checkExpiredAccesstoken().then((response) => {
      if (response) {
        let newMeber = [...members];
        newMeber[index].role = authority;

        setMembers(newMeber);
        const authorityKinds =
          document.getElementsByClassName("authorityKinds");
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
          }
        });
      }
    });
  };

  const searchMember = (e) => {
    e.preventDefault();
    checkExpiredAccesstoken().then((response) => {
      if (response) {
        if (searchName === "") {
          searchAllUsers();
        } else {
          api.get("/api/users/detail?username=" + searchName).then((result) => {
            if (result.data.success) {
              setMembers(result.data.response);
            } else {
              Swal.fire({
                icon: "info",
                title: searchName + "회원은 <br/>존재하지 않습니다!",
              });
            }
          });
        }
      }
    });
  };

  /**
   * 회원 목록에서 특정 회원을 제거하는 함수
   * @param {*} username
   * @param {*} id
   */
  const userRemoveHandler = (username, id) => {
    checkExpiredAccesstoken().then((response) => {
      Swal.fire({
        icon: "info",
        title: `${username} 사용자를 회원\n목록에서 제거하시겠습니까?`,
        showDenyButton: true,
        confirmButtonText: "네",
        denyButtonText: `아니요`,
      }).then(async (response) => {
        if (response.isConfirmed) {
          try {
            await api.delete("/api/users/" + id).then((result) => {
              searchAllUsers();
              Swal.fire({
                icon: "success",
                title: `${username} 사용자를\n 정상적으로 제거하였습니다.`,
              });
            });
          } catch (error) {
            if (error.response.status === 406) {
              Swal.fire({
                icon: "error",
                title: `관리자 권한을 지닌\n사용자는 제거할 수 없습니다.`,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "예기치 못 한 에러가 발생하였습니다.",
              });
              window.location.href = "/login";
            }
          }
        } else {
          return;
        }
      });
    });
  };

  const modifyUserInfoHandler = (
    userId,
    username,
    studentId,
    email,
    generation
  ) => {
    if (
      username === "" ||
      studentId === "" ||
      email === "" ||
      generation === null
    ) {
      Swal.fire({
        title: "모든 정보를 입력해 주세요",
        icon: "warning",
        confirmButtonColor: "#a7a7a7",
        confirmButtonText: "닫기",
      });
      return;
    }

    checkExpiredAccesstoken().then((response) => {
      Swal.fire({
        icon: "info",
        title: `${username} 사용자의 회원정보를\n변경하시겠습니까?`,
        showDenyButton: true,
        confirmButtonColor: "#4880ee",
        denyButtonColor: "#a7a7a7",
        confirmButtonText: "네",
        denyButtonText: `아니요`,
      }).then(async (response) => {
        if (response.isConfirmed) {
          try {
            await api
              .patch(`/api/v2/user/info/`, {
                email,
                generation,
                studentId,
                userId,
                username,
              })
              .then((result) => {
                searchAllUsers();
                Swal.fire({
                  confirmButtonColor: "#4880ee",
                  icon: "success",
                  title: `정상적으로 변경되었습니다.`,
                });
              });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "예기치 못 한 에러가 발생하였습니다.",
            });
          }
        } else {
          return;
        }
      });
    });
  };

  return (
    <div id="MemberManage">
      <form className="d-flex align-items-center">
        <input
          className="w-25"
          type={"text"}
          value={searchName}
          onChange={(res) => {
            setSearchName(res.target.value);
          }}
          placeholder="이름을 입력해주세요."
        ></input>
        <button
          style={{ height: "50px", width: "100px" }}
          className="p-0 mt-3 info-color"
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
          <thead>
            <tr>
              <th style={{ width: "8rem" }}>이름</th>
              <th style={{ width: "9rem" }}>학번</th>
              <th style={{ width: "20rem" }}>이메일</th>
              <th style={{ width: "5rem" }}>기수</th>
              <th>회원권한</th>
              <th>정보변경</th>
              <th>회원제거</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, idx) => {
              return (
                <tr key={idx}>
                  {member.userInfoModifyMode ? (
                    <>
                      <td>
                        <input
                          className="usernameInput"
                          type="text"
                          value={member.username}
                          onChange={(e) => {
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    username: e.target.value,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="studentIdInput"
                          type="text"
                          value={member.studentId}
                          onChange={(e) => {
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    studentId: e.target.value,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="emailInput"
                          type="text"
                          value={member.email}
                          onChange={(e) => {
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    email: e.target.value,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={"" + member.generation}
                          onChange={(e) => {
                            if (e.target.value < 0) e.target.value = 0;
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    generation: e.target.value,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                          style={{
                            height: "1.5rem",
                            fontSize: "15px",
                            color: "black",
                            borderRadius: "2.5px",
                          }}
                        />
                      </td>
                      <td>
                        <select
                          className="authorityKinds text-center"
                          value={member.role}
                          disabled={true}
                          onChange={(res) => {
                            changeAuthority(
                              member.userId,
                              member.username,
                              res.target.value,
                              idx
                            );
                          }}
                        >
                          <option value="ROLE_TEMP">미지정</option>
                          <option value="ROLE_MEMBER">회원</option>
                          <option value="ROLE_ADMIN">관리자</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="saveModifedUserInfo"
                          onClick={(e) => {
                            modifyUserInfoHandler(
                              member.userId,
                              member.username,
                              member.studentId,
                              member.email,
                              member.generation
                            );
                          }}
                        >
                          저장
                        </button>
                        <button
                          className="modifyUserInfoCancleButton"
                          onClick={(response) => {
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    userInfoModifyMode:
                                      !member.userInfoModifyMode,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                        >
                          취소
                        </button>
                      </td>
                      <td>
                        <button
                          className="text-bg-danger"
                          onClick={(response) => {
                            userRemoveHandler(member.username, member.userId);
                          }}
                        >
                          추방
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="usernameInput">{member.username}</td>
                      <td className="studentIdInput">{member.studentId}</td>
                      <td>{member.email}</td>
                      <td className="emailInput">
                        {member.generation ? member.generation : "정보없음"}
                      </td>
                      <td>
                        <select
                          className="authorityKinds text-center"
                          value={member.role}
                          onChange={(res) => {
                            changeAuthority(
                              member.userId,
                              member.username,
                              res.target.value,
                              idx
                            );
                          }}
                        >
                          <option value="ROLE_TEMP">미지정</option>
                          <option value="ROLE_MEMBER">회원</option>
                          <option value="ROLE_ADMIN">관리자</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="modifyUserInfoButton"
                          onClick={(response) => {
                            const updatedItems = members.map(
                              (prevMembersInfo) => {
                                if (prevMembersInfo.userId === member.userId) {
                                  return {
                                    ...prevMembersInfo,
                                    userInfoModifyMode:
                                      !member.userInfoModifyMode,
                                  };
                                }
                                return prevMembersInfo;
                              }
                            );
                            setMembers(updatedItems);
                          }}
                        >
                          변경
                        </button>
                      </td>
                      <td>
                        <button
                          className="text-bg-danger"
                          onClick={(response) => {
                            userRemoveHandler(member.username, member.userId);
                          }}
                        >
                          추방
                        </button>
                      </td>
                    </>
                  )}
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
