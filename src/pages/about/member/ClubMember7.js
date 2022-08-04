import introduce from "../../../imgs/banner/member7.jpg";
import "./ClubMember.scss";
const imgUrl = "member/7/";

function ClubMember7() {
    return(
        <div id="memberPage">
            <div className="container">
                <img src={introduce} alt="banner" style={{
                    width: "100%",
                    height: "200px",
                    margin: "50px 0px 80px 0px",
                }}/>
                <div className="studentId"><span>15학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "hanju.JPG"} alt="회원"/>
                        <div>이한주</div>
                    </div>
                </div>


                <div className="studentId"><span>16학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "gwangsik.JPG"} alt="회원"/>
                        <div>조광식</div>
                    </div>
                </div>

                <div className="studentId"><span>17학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "yungi.jpg"} alt="회원"/>
                        <div>김윤기</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "changju.jpg"} alt="회원"/>
                        <div>이창주</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yongseok.jpg"} alt="회원"/>
                        <div>최용석</div>
                    </div>
                </div>

                <div className="studentId"><span>18학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "kyungmin.jpg"} alt="회원"/>
                        <div>김경민</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yeonhui.jpg"} alt="회원"/>
                        <div>정연휘</div>
                    </div>
                </div>


                <div className="studentId"><span>19학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "seojin.jpg"} alt="회원"/>
                        <div>김서진</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "eunseo.jpg"} alt="회원"/>
                        <div>김은서</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "gwangho.jpg"} alt="회원"/>
                        <div>나광호</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jaehong.jpg"} alt="회원"/>
                        <div>남재홍</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yunseok.jpg"} alt="회원"/>
                        <div>노윤석</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chankyu.jpg"} alt="회원"/>
                        <div>문찬규</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seokhyun.jpg"} alt="회원"/>
                        <div>윤석현</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chan.jpg"} alt="회원"/>
                        <div>이 찬</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "woochang.jpg"} alt="회원"/>
                        <div>이우창</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jihyung.jpg"} alt="회원"/>
                        <div>이지형</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jinseo.jpg"} alt="회원"/>
                        <div>이진서</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>이택민</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "hyunwoo.jpg"} alt="회원"/>
                        <div>임현우</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jonghoon.jpg"} alt="회원"/>
                        <div>전종훈</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "minseo.jpg"} alt="회원"/>
                        <div>한민서</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "daeun.jpg"} alt="회원"/>
                        <div>허다은</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubMember7;