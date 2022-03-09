import { Link } from "react-router-dom"
import "./RegisterPage.scss"

function RegisterPage(){
    return(
        <div className="RegisterPage container">
            <div className="titleFrame">
                <h5><strong>정보입력</strong></h5>
                <div>
                    <Link to={"/"}>Home</Link> &nbsp;/&nbsp; 회원가입 &nbsp;/&nbsp; 정보입력
                </div>
            </div>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <td>
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
                                <i class="fas fa-lock fa-sm"></i>
                                <input type={"text"} id="userPw"></input>
                            </div>
                        </td>
                        <td>
                            <label htmlFor="userPwCheck">비밀번호 확인</label><br/>
                            <div className="inputText">
                                <i class="fas fa-lock fa-sm"></i>
                                <input type={"text"} id="userPwCheck"></input>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                        <td>
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
                                <i class="fas fa-male fa-sm"></i>
                                <input type={"text"} id="userName"></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="textCheck">
                                <label htmlFor="userNickName">닉네임</label><br/>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i class="far fa-smile fa-sm"></i>
                                <input type={"text"} id="userNickName"></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="textCheck">
                                <label htmlFor="userEmail">이메일</label><br/>
                                <input type={"button"} value={"중복체크"}></input>
                            </div>
                            <div className="inputText">
                                <i class="far fa-envelope fa-sm"></i>
                                <input type={"email"} id="userEmail"></input>
                            </div>
                        </td>
                    </tr>
                </tbody>

                <thead>
                    <tr>
                        <td>
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
                        <td>
                            <p>메일링 서비스</p>
                            <label className="checkLabel" htmlFor="informCheck1"><input type={"checkbox"} id="informCheck1"/> &nbsp; 정보 메일을 받겠습니다.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>정보 공개</p>
                            {/* <label className="checkLabel" htmlFor="informCheck2"><input type={"checkbox"} id="informCheck2"/> &nbsp; 다른 분들이 나의 정보를 볼 수 있도록 합니다.</label> */}
                            {/* <p>
                                Note: 정보공개를 바꾸시면 앞으로 0일 이내에는 변경이 안됩니다.
                            </p> */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RegisterPage