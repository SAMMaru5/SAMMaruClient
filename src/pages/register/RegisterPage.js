import { useLocation, Link, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import "./RegisterPage.scss"

function RegisterPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const [informAgree1, setInformAgree1] = useState(true)
    const [informAgree2, setInformAgree2] = useState(true)
    
    useEffect(() => {
        if(location.state === null){
            alert("not agree")
            navigate("/agree")
        }
    }, [navigate, location.state])
    



    return(
        <div className="RegisterPage container">
            <div className="titleFrame">
                <h5><strong><i class="fas fa-map-marker-alt "></i> &nbsp;정보입력</strong></h5>
                <div>
                    <Link to={"/"}>Home</Link> &nbsp;/&nbsp; 회원가입 &nbsp;/&nbsp; 정보입력
                </div>
            </div>
            <hr/>

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
                                <input type={"text"} id="userId"></input>

                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPw">비밀번호</label><br/>
                            
                            <div className="inputText">
                                <i className="fas fa-lock fa-sm"></i>
                                <input type={"text"} id="userPw"></input>
                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPwCheck">비밀번호 확인</label><br/>
                            <div className="inputText">
                                <i className="fas fa-lock fa-sm"></i>
                                <input type={"text"} id="userPwCheck"></input>
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
                                <input type={"text"} id="userName"></input>
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
                    </tr>
                    <tr>
                        <td>
                            <div className="textCheck">
                                <label htmlFor="userEmail">이메일</label><br/>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i className="far fa-envelope fa-sm"></i>
                                <input type={"email"} id="userEmail"></input>
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
                            <button><h5>회원가입</h5></button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default RegisterPage