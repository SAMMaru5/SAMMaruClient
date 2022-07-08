import "./MemberManage.scss";

function MemberManage() {
    return(
        <div id="MemberManage">
            <input type={"text"} placeholder="학번을 입력해주세요."></input>
            <button type="submit" >검색</button>
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
                            2021028027
                        </td>
                        <td>
                            sammaru123@gmail.com
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
                    <tr>
                        <td>
                            test
                        </td>
                        <td>
                            2021028027
                        </td>
                        <td>
                            sammaru123@gmail.com
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
            </table>
        </div>
    );
}

export default MemberManage;