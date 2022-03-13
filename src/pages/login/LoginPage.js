import { useState } from "react"
import { Link } from "react-router-dom"
import "./LoginPage.scss"

function LoginPage() {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const onLogin = () =>{
        console.log(userPw)
        console.log(userId)
    } 

    return(
        <div className="LoginPage">
            <div className="loginFrame">
            <form className="loginForm">
                <figure className="loginLogo">

                </figure>
                <input type={"text"} placeholder="이메일" onChange={(e) =>{setUserId(e.target.value)}}></input>
                <input type={"password"} placeholder="비밀번호"onChange={(e) =>{setUserPw(e.target.value)}}></input>
                <button type="submit" onClick={()=>{onLogin()}}>로그인</button>
                <div className="loginLink">
<<<<<<< HEAD
                    <Link to="/agree">회원가입</Link>
                    <Link to="/findUser">아이디/비번 찾기</Link>
=======
                    <Link to="/">회원가입</Link>
                    <Link to="/">비밀번호 찾기</Link>
>>>>>>> ff24b389efde2d9520c1c3a060a770c158719422
                </div>
            </form>
            </div>
        </div>
    )
}

export default LoginPage