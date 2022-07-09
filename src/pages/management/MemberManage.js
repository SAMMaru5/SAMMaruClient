import { useEffect } from "react";
import { useState } from "react";
import { call } from "../../hooks/useFetch";
import "./MemberManage.scss";
import Swal from "sweetalert2";

function MemberManage(props) {
    const [members, setMembers] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {

        call("/api/users/info", "GET", "")
        .then((response) => {
            console.log(response);
            if(response.success){
                setMembers(response.response);
                setLoading(true);
            }
  
        })
  
    }, [])

    const changeAuthority = (id, name, authority)=>{
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
                        console.log(response)
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

    return(
        <div id="MemberManage">
            <input type={"text"} placeholder="학번을 입력해주세요."></input>
            <button type="submit" >검색</button>
            {loading && members.length !== 0? 
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
                            {member.role==="ROLE_TEMP" ?
                                <select defaultValue={"ROLE_TEMP"} onChange={(res)=>{changeAuthority(member.userId, member.username, res.target.value)}}>

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
                                : member.role==="ROLE_MEMBER" ?
                                    <select defaultValue={"ROLE_MEMBER"}  onChange={(res)=>{changeAuthority(member.userId, member.username, res.target.value)}}>

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
                                :
                                    <select defaultValue={"ROLE_ADMIN"}  onChange={(res)=>{changeAuthority(member.userId, member.username, res.target.value)}}>

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

                                }
                            
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