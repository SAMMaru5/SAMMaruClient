import introduce from "../../../imgs/banner/member6.jpg";
import "./ClubMember.scss";
const imgUrl = "member/6/";

function ClubMember6() {
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
                        <img src={imgUrl + "juhyeon.jpg"} alt="회원"/>
                        <div>김주현</div>
                    </div>
                </div>


                <div className="studentId"><span>15학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "mingyu3.jpg"} alt="회원"/>
                        <div>정민규</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>배나영</div>
                    </div>
                </div>

                <div className="studentId"><span>16학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "ahyeon.jpg"} alt="회원"/>
                        <div>천아현</div>
                    </div>
                </div>

                <div className="studentId"><span>18학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "jiwon.jpg"} alt="회원"/>
                        <div>강지원</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "mingyu2.jpg"} alt="회원"/>
                        <div>김민규</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yewon.jpg"} alt="회원"/>
                        <div>김예원</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>함범준</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jeongmin.jpg"} alt="회원"/>
                        <div>이정민</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sangwoo.jpg"} alt="회원"/>
                        <div>임상우</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>임종훈</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jongwon.jpg"} alt="회원"/>
                        <div>서종원</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "yeongson.jpg"} alt="회원"/>
                        <div>홍영선</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubMember6;