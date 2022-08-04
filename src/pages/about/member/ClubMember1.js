import introduce from "../../../imgs/banner/member1.jpg";
import "./ClubMember.scss";
const imgUrl = "member/1/";

function ClubMember1() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>10학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>정택영 (1대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seunghyun.jpg"} alt="회원"/>
                        <div>이승현 (2대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl+"jeonhui.jpg"} alt="회원"/>
                        <div>강전희</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl+"jonghyun.jpg"} alt="회원"/>
                        <div>한종현</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ClubMember1;