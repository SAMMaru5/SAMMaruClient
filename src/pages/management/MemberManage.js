import { useEffect } from "react";
import { useState } from "react";
import { call } from "../../hooks/useFetch";
import "./MemberManage.scss";
import Swal from "sweetalert2";

function MemberManage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {

        call("/api/users/info", "GET", "")
        .then((response) => {
            if(response.success){
                setMembers(response.response);
                setLoading(true);
            }
  
        })
  
    }, [])

    const changeAuthority = (id, name, authority, index)=>{
        let newMeber = [...members];
        newMeber[index].role = authority

        setMembers(newMeber)
        const authorityKinds = document.getElementsByClassName("authorityKinds");
        authorityKinds[index].value = authority;

        let authorityStr = "미지정으"
        if(authority ==="ROLE_ADMIN"){
            authorityStr = "관리자"
        }
        else if(authority ==="ROLE_MEMBER"){
            authorityStr = "회원으"
        }

        Swal.fire({
            icon: "info",
            title: `${name} 사용자의 권한을 ${authorityStr}로 바꾸시겠습니까? `,
            showDenyButton: true,
            confirmButtonText: '네',
            denyButtonText: `아니요`
      
          }).then((result) => {
            if (result.isConfirmed) {
                call("/api/users/"+id+"/role", "PATCH", {"role":authority})
  
                    .then((response) => {
                        if(response.success){
                            Swal.fire({
                                icon: 'success',
                                title: '권한을 변경하였습니다.',
                              })
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: '권한 변경에 실패하셨습니다.',
                              }).then((response)=>{
                                if(response.isConfirmed){
                                    window.location.replace("/")
                                }
                              })
                        }
            
                    })
            }
            else{

            }
          });
    }

    const searchMember = (e)=>{
        e.preventDefault();
        call("/api/user/info/"+name, "GET", "")
        .then((result)=>{
            if(result.success){
                setMembers([result.response]);
            }
        })
    }

    return(
        <div id="MemberManage">
            <form>
                <input type={"text"} value={name} onChange={(res)=>{setName(res.target.value)}} placeholder="이름을 입력해주세요."></input>
                <button type="submit" onClick={(e)=>{searchMember(e)}}>검색</button>
            </form>
            {loading? 
            <table>
                <colgroup>

                </colgroup>
                <thead>
                    <tr>
                        <th>
                            이름
                        </th>
                        <th>
                            학번
                        </th>
                        <th>
                            이메일
                        </th>
                        <th>
                            회원권한
                        </th>
                    </tr>
                </thead>

                
                
                <tbody>
                    {members.map((member, i)=>{
                        return(
                        <tr key={i}>
                            <td>
                                {member.username}

                            </td>
                            <td>
                                {member.studentId}

                            </td>
                            <td>
                                {member.email}

                            </td>
                            <td>

                            <select className="authorityKinds" value={member.role} onChange={(res)=>{changeAuthority(member.userId, member.username, res.target.value, i) }}>
                                <option value="ROLE_TEMP">
                                    미지정
                                </option>
                                <option value="ROLE_MEMBER">
                                    회원
                                </option>
                                <option value="ROLE_ADMIN">
                                    관리자
                                </option>
                            </select>
                                
                            
                        </td>
                    </tr>
                    )
                    })}
                
                </tbody>
                </table>
                : 
                <table>
                <colgroup>

                </colgroup>
                <thead>
                    <tr>
                        <th>
                            이름
                        </th>
                        <th>
                            학번
                        </th>
                        <th>
                            이메일
                        </th>
                        <th>
                            회원권한
                        </th>
                    </tr>
                </thead>

                
                
                <tbody>
                        
                        <tr>
                            <td>
                                test
                            </td>
                            <td>
                                test
                            </td>
                            <td>
                                test
                            </td>
                            <td>
                            <select>
                                <option value="ROLE_TEMP">
                                    미지정
                                </option>
                                <option value="ROLE_MEMBER">
                                    회원
                                </option>
                                <option value="ROLE_ADMIN">
                                    관리자
                                </option>
                            </select>
                        </td>
                    </tr>
                
                </tbody>
                </table>}
                
           
        </div>
    );
}

export default MemberManage;