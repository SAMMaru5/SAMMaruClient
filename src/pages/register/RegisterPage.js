import { useLocation, Link, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import "./RegisterPage.scss"
import Swal from "sweetalert2"

import { call } from "../../hooks/useFetch"

function RegisterPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const agree = location.state;

    const [informAgree1, setInformAgree1] = useState(true)
    const [informAgree2, setInformAgree2] = useState(true)
    
    const [User, setUser] = useState({"studentId" : "",  "username":"", "password" : "", "email" : ""})
    const [pwCheck, setPwCheck] = useState("");

    useEffect(() => {
        if(agree === null){
            alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.")
            navigate("/agree")
        }
      
    }, [navigate, agree])
    
    const registerValid = async (e)=>{
        e.preventDefault();
        if(User.studentId === ""){
            Swal.fire({
                title: '아이디를 입력해주세요.',
                icon: 'warning',
            }
        )
        }
        else if(User.password !== pwCheck){
                    Swal.fire({
                    title: '비밀번호가 일치하지 않습니다.',
                    icon: 'warning',
                }
            )
        }
        else{
            register();
        }
    }

    const register = (e)=>{
        call("/auth/signup", "POST", User)
        .then((response)=>{
            if(response.success){
                Swal.fire({
                    icon: 'success',
                    title: '회원가입에 성공했습니다.',
                  })
                  .then((result)=>{
                      if(result.isConfirmed){
                          navigate("/login")
                      }
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: '회원가입에 실패했습니다.',
                  })
            }
            })
         

    } 

    return(
        <div className="RegisterPage container">
            <div className="titleFrame">
                <h5><strong><i className="fas fa-map-marker-alt "></i> &nbsp;정보입력</strong></h5>
                <div>
                    <Link to={"/"}>Home</Link> &nbsp;/&nbsp; 회원가입 &nbsp;/&nbsp; 정보입력
                </div>
            </div>
            <hr/>
            <form onSubmit={(e)=>{registerValid(e)}}>
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

                                <label htmlFor="userId">아이디</label>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i className="fas fa-user-alt fa-sm" ></i>
                                <input type={"text"} autoComplete="on" id="userId" pattern="^[a-zA-Z0-9]{5,15}$" title="최소 5글자에서 최대 15글자 사이의 영문과 숫자만 입력해주세요." required onChange={(e)=>{setUser( {...User, "studentId" : e.target.value})} }></input>

                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPw">비밀번호</label><br/>
                            
                            <div className="inputText">
                                <i className="fas fa-lock fa-sm"></i>
                                <input type={"password"} autoComplete="current-password" id="userPw" title="최소 8자리에서 최대 16자리까지 숫자, 영문, 특수문자 각 1개 이상 포함해주세요." pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$" required onChange={(e) =>{setUser({...User, "password" : e.target.value})}}></input>
                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPwCheck">비밀번호 확인</label><br/>
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
                                <input type={"text"} id="userName" pattern="[0-9]{2}[가-힣a-zA-Z0-9]{2,}" title="학번 이름으로 입력해주세요. ex)18정원재" required onChange={(e) =>{setUser({...User, "username" : e.target.value})}}></input>
                            </div>
                        </td>
                    </tr>
                    <tr className="emptyHr">
                        <td colSpan={"3"}>
                            <hr/>
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
                                <label htmlFor="userEmail">이메일</label><br/>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i className="far fa-envelope fa-sm"></i>
                                <input type={"email"} id="userEmail" required onChange={(e) =>{setUser({...User, "email" : e.target.value})}}></input>
                            </div>
                        </td>
                    </tr>
                </tbody>

                <thead>
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
                <thead>
                    <tr>
                        <td colSpan={"3"}>
                            <button type="submit"><h5>회원가입</h5></button>
                        </td>
                    </tr>
                </thead>
            </table>
            </form>
        </div>
    )
}

export default RegisterPage