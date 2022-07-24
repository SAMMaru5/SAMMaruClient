import introduce from "../../../imgs/banner/member1.jpg";
import img from "../../../imgs/img.png";
import "./ClubMember.scss";

function ClubMember() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>N학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>조희진</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>name</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>name</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>name</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ClubMember;