import { useEffect } from "react";
import { useState } from "react";
import { call } from "../../hooks/useFetch";
import "./MemberManage.scss";

function MemberManage(props) {
    const [members, setMembers] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {

        call("/api/users/info/", "GET", "")
        .then((response) => {
            console.log(response);
            if(response.success){
                setMembers(response.response);
                setLoading(true);
            }
  
        })
    //   call("/api/user/info", "GET","")
    //   .then((response) =>{
    //     console.log(response)
    //   })
  
    }, [])

    const changeAuthority = (authority)=>{
        console.log(authority);
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
                                <select defaultValue={"ROLE_TEMP"} onChange={(res)=>{changeAuthority(res.target.value)}}>

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
                                    <select defaultValue={"ROLE_MEMBER"}>

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
                                    <select defaultValue={"ROLE_ADMIN"}>

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