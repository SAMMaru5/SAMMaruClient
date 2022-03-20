import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.scss"
import { login } from "../../hooks/useAuth"
import Swal from "sweetalert2"

function LoginPage() {
    const navigate = useNavigate();
    const [User, setUser] = useState({"studentId":"", "password" : ""});

    const onLogin = () =>{
        login(User).then((response)=>{
            if(response.success){
                Swal.fire({
                    icon: 'success',
                    title: '로그인에 성공하셨습니다.',
                  })
                  .then((result)=>{
                      if(result.isConfirmed){
                          navigate("/")
                      }
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: '로그인에 실패하셨습니다.',
                  })
            }
        });
    } 

    return(
        <div className="LoginPage">
            <div className="loginFrame">
            <form className="loginForm">
                <figure className="loginLogo">
                <img
                    src="img/login_logo.png"
                    alt="로그인 로고 이미지"
                />
                </figure>
                <input type={"text"} autoComplete="username" placeholder="아이디" required onChange={(e) =>{setUser({...User, "studentId" : e.target.value})}}></input>
                <input type={"password"} autoComplete="current-password" placeholder="비밀번호" required onChange={(e) =>{setUser({...User, "password" : e.target.value})}}></input>
                <button type="button" onClick={()=>{onLogin()}}>로그인</button>
                <div className="autoLoginFrame"><label htmlFor="autoLogin"><input id="autoLogin" type={"checkbox"}></input> &nbsp; 자동 로그인</label></div>
                <div className="loginLink">
                    <Link to="/agree">회원가입</Link>
                    <Link to="/findUser">아이디/비번 찾기</Link>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LoginPage