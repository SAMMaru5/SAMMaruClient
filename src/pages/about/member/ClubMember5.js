import introduce from "../../../imgs/banner/member5.jpg";
import "./ClubMember.scss";
const imgUrl = "member/5/";

function ClubMember5() {
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
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>윤유상</div>
                    </div>

                </div>


                <div className="studentId"><span>13학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "heechan.jpg"} alt="회원"/>
                        <div>유희찬</div>
                    </div>
                </div>

                <div className="studentId"><span>14학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "donghun.jpg"} alt="회원"/>
                        <div>곽동훈</div>
                    </div>
                </div>

                <div className="studentId"><span>16학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>박병직</div>
                    </div>
                </div>


                <div className="studentId"><span>17학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>권민석</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jinhoon.jpg"} alt="회원"/>
                        <div>박진훈</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>이시헌</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jaehee.jpg"} alt="회원"/>
                        <div>김재희</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>김강민</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>김서기</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>노관태</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>반용빈</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>신윤성</div>
                    </div>
                    <div className="member">
                        <img src="https://via.placeholder.com/120X150" alt="회원"/>
                        <div>최준영</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubMember5;