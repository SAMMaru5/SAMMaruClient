import introduce from "../../../imgs/banner/member9.jpg";
import "./ClubMember.scss";
const imgUrl = "member/9/";

function ClubMember9() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>14학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "sungsoo.jpg"} alt="회원"/>
                        <div>김성수</div>
                    </div>
                </div>


                <div className="studentId"><span>15학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "myounghyun.jpg"} alt="회원"/>
                        <div>조명현</div>
                    </div>
                </div>

                <div className="studentId"><span>18학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "wonjae.jpg"} alt="회원"/>
                        <div>정원재</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "siwon.jpg"} alt="회원"/>
                        <div>주시원</div>
                    </div>
                </div>

                <div className="studentId"><span>19학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "bonyoung.jpg"} alt="회원"/>
                        <div>구본영</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jiwon2.jpg"} alt="회원"/>
                        <div>김지원</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jiyoung.jpg"} alt="회원"/>
                        <div>박지영</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sooyoung.jpg"} alt="회원"/>
                        <div>송수영</div>
                    </div>
                </div>

                <div className="studentId"><span>20학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "kyungwook.jpg"} alt="회원"/>
                        <div>김경욱</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sungyeon.jpg"} alt="회원"/>
                        <div>김성연</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "junhee.jpg"} alt="회원"/>
                        <div>김준희</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yongsung.jpg"} alt="회원"/>
                        <div>박용성</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "minjung2.jpg"} alt="회원"/>
                        <div>서민정</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jungje.jpg"} alt="회원"/>
                        <div>손정제</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chaerin.jpg"} alt="회원"/>
                        <div>정채린</div>
                    </div>
                </div>

                <div className="studentId"><span>21학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "minjung.jpg"} alt="회원"/>
                        <div>곽민정</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "minhyuk.jpg"} alt="회원"/>
                        <div>김민혁</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "junho.jpg"} alt="회원"/>
                        <div>김준호</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "hyunkyum.jpg"} alt="회원"/>
                        <div>김현겸</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sangwoo2.jpg"} alt="회원"/>
                        <div>문상우</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sungbum.jpg"} alt="회원"/>
                        <div>박성범</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "soomin.jpg"} alt="회원"/>
                        <div>심수민</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "taehyeon.jpg"} alt="회원"/>
                        <div>우태현</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "minkyu4.jpg"} alt="회원"/>
                        <div>조민규</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubMember9;