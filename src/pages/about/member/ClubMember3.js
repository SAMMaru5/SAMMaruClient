import introduce from "../../../imgs/banner/member3.jpg";
import "./ClubMember.scss";
const imgUrl = "member/3/";

function ClubMember3() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>11학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "jinseok.jpg"} alt="회원"/>
                        <div>임진석</div>
                    </div>
                </div>

                <div className="studentId"><span>12학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "dongjin.jpg"} alt="회원"/>
                        <div>이동진</div>
                    </div>
                </div>

                <div className="studentId"><span>14학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "eunbi.jpg"} alt="회원"/>
                        <div>조은비</div>
                    </div>
                </div>

                <div className="studentId"><span>15학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "yeji.jpg"} alt="회원"/>
                        <div>우예지</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "soyeon.jpg"} alt="회원"/>
                        <div>박소연</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sujeong.jpg"} alt="회원"/>
                        <div>김수정</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jiyong.jpg"} alt="회원"/>
                        <div>허지용</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "ilhwan.jpg"} alt="회원"/>
                        <div>김일환</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "duhui.jpg"} alt="회원"/>
                        <div>김두회</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "mingyu.jpg"} alt="회원"/>
                        <div>강민규 (7대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chaeeun.jpg"} alt="회원"/>
                        <div>이채은</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "dongun.jpg"} alt="회원"/>
                        <div>박동운</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubMember3;