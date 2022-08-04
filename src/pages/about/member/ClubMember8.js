import introduce from "../../../imgs/banner/member8.jpg";
import "./ClubMember.scss";
const imgUrl = "member/8/";

function ClubMember8() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>16학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "simin.png"} alt="회원"/>
                        <div>김시민</div>
                    </div>
                </div>


                <div className="studentId"><span>17학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "hyeyoungs.jpg"} alt="회원"/>
                        <div>박혜영</div>
                    </div>
                </div>

                <div className="studentId"><span>18학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "jihyeons.jpg"} alt="회원"/>
                        <div>박지현</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "ujin.jpg"} alt="회원"/>
                        <div>변유진</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seungyeon.jpg"} alt="회원"/>
                        <div>김승연</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "junghwan.jpg"} alt="회원"/>
                        <div>유정환</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sungmok.jpg"} alt="회원"/>
                        <div>이성목</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "wondo.jpg"} alt="회원"/>
                        <div>장원도</div>
                    </div>
                </div>

                <div className="studentId"><span>20학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "chisan.jpg"} alt="회원"/>
                        <div>안치산</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seungjoo.jpg"} alt="회원"/>
                        <div>오승주</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jinyoungs.jpg"} alt="회원"/>
                        <div>이진영</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "hyeonchang.jpg"} alt="회원"/>
                        <div>조현창</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "heejin.jpg"} alt="회원"/>
                        <div>조희진 (10대 회장)</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubMember8;