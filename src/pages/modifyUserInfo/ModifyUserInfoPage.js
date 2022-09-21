import "./ModifyUserInfoPage.scss";
import { useLocation,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import api from "../../utils/api";

function ModifyUserInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pwCheck1 = location.state;

  const [User, setUser] = useState({"studentId" : "",  "username":"", "password" : "", "email" : ""})
  const [loading, setLoading] = useState(false);
  const [pwCheck2, setPwCheck] = useState("");

  useEffect(() => {
    if(pwCheck1 === null){
      alert("비밀번호 확인 작업을 해야 회원 정보를 수정할 수 있습니다.")
      navigate("/");
    }
  }, [navigate, pwCheck1])

  useEffect(() => {
    api.get("/api/user/info").then(
      (response)=>{
        setUser({"studentId" : response.data.response.studentId, "username" : response.data.response.username, "email" : response.data.response.email});
        setLoading(true);
      }
    )
  }, []);

  function modifyUser(e){
    e.preventDefault();
    const modifyUserBtn = document.getElementById("modifyUserBtn");
    modifyUserBtn.setAttribute('disabled', true);
    modifyUserBtn.innerText = "정보수정 중...";
    modifyUserBtn.style.color = "white";
    if(User.password !== pwCheck2){
                Swal.fire({
                title: '비밀번호가 일치하지 않습니다.',
                icon: 'warning',
            }
        ).then((result)=>{
            if(result){
              modifyUserBtn.removeAttribute('disabled');
              modifyUserBtn.innerText = "정보수정"
          }
          });
    }
    else{
      api.patch("/api/user/info", User).then(
        (response)=>{
          if(response.data.success){
            Swal.fire({
              title: '회원정보가 수정되었습니다.',
              icon: 'success',
                }
            ).then(
              ()=>{navigate("/")}
            )
          }
        }
      )
    }

  }

  return(
      <div className="ModifyUserInfoPage container">
        <div className="titleFrame">
                <h5><strong><i className="fas fa-map-marker-alt "></i> &nbsp;정보수정</strong></h5>

            </div>
            <hr/>
            {loading ? 

            <form onSubmit={(e)=>{modifyUser(e)}}>
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
                                <i className="fas fa-user-alt fa-sm" ></i>
                                <input type={"text"} autoComplete="on" id="userId" value={User.studentId} readOnly pattern="^[0-9]{4,}$"  title="학번을 입력해주세요." required onChange={(e)=>{setUser( {...User, "studentId" : e.target.value})} }></input>

                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPw">비밀번호</label>
                            
                            <div className="inputText">
                                <i className="fas fa-lock fa-sm"></i>
                                <input type={"password"} autoComplete="current-password" id="userPw" title="최소 8자리에서 최대 20자리까지 숫자, 영문, 특수문자 각 1개 이상 포함해주세요." pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$" required onChange={(e) =>{setUser({...User, "password" : e.target.value})}}></input>
                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPwCheck">비밀번호 확인</label>
                            <div className="inputText">
                                <i className="fas fa-lock fa-sm"></i>
                                <input type={"password"} autoComplete="current-password" id="userPwCheck" required onChange={(e) =>{setPwCheck(e.target.value)}}></input>
                            </div>
                        </td>
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
                        <label htmlFor="userName">이름</label><br/>
                            <div className="inputText">
                                <i className="fas fa-male fa-sm"></i>
                                <input type={"text"} id="userName" value={User.username}  required onChange={(e) =>{setUser({...User, "username" : e.target.value})}}></input>
                            </div>
                        </td>
                    </tr>
                    <tr className="emptyHr">
                        <td colSpan={"3"}>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="textCheck">
                                <label htmlFor="userEmail">이메일</label><br/>
                            </div>
                            <div className="inputText">
                                <i className="far fa-envelope fa-sm"></i>
                                <input type={"email"} id="userEmail" value={User.email}  required onChange={(e) =>{setUser({...User, "email" : e.target.value})}}></input>
                            </div>
                        </td>
                    </tr>
                </tbody>

                <thead>
                    <tr>
                        <td colSpan={"3"}>
                            <button id="modifyUserBtn" type="submit"><h5>정보수정</h5></button>
                        </td>
                    </tr>
                </thead>
            </table>
            </form>
            : null}
      </div>
  );
  }

  export default ModifyUserInfoPage