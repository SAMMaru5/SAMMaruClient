import introduce from "../../../imgs/banner/member4.jpg";
import "./ClubMember.scss";
const imgUrl = "member/4/";

function ClubMember4() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>13학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "bonjae.jpg"} alt="회원"/>
                        <div>구본재 (5대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "minuk.jpg"} alt="회원"/>
                        <div>이민욱</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jinhyun.jpg"} alt="회원"/>
                        <div>송진현</div>
                    </div>
                </div>


                <div className="studentId"><span>14학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "suna.jpg"} alt="회원"/>
                        <div>민선아</div>
                    </div>
                </div>

                <div className="studentId"><span>15학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "sojin.jpg"} alt="회원"/>
                        <div>오소진</div>
                    </div>
                </div>

                <div className="studentId"><span>16학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "jumi.jpg"} alt="회원"/>
                        <div>홍주미</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "ijin.jpg"} alt="회원"/>
                        <div>윤이진 (6대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jaesik.jpg"} alt="회원"/>
                        <div>문재식 (8대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "juhyun.jpg"} alt="회원"/>
                        <div>김주현</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jongu.jpg"} alt="회원"/>
                        <div>김종우</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chiyongs.jpg"} alt="회원"/>
                        <div>신치용 (9대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "taesun.jpg"} alt="회원"/>
                        <div>유태선</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "byungdo.jpg"} alt="회원"/>
                        <div>최병도</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sangrok.jpg"} alt="회원"/>
                        <div>정상록</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "hwanchul.jpg"} alt="회원"/>
                        <div>조환철</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubMember4;