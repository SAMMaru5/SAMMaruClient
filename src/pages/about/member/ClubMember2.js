import introduce from "../../../imgs/banner/member2.jpg";
import "./ClubMember.scss";
const imgUrl = "member/2/";

function ClubMember2() {
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
                        <img src={imgUrl + "han.png"} alt="회원"/>
                        <div>김 한</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "dongjun.jpg"} alt="회원"/>
                        <div>정동준</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl+"giu.jpg"} alt="회원"/>
                        <div>조기우</div>
                    </div>
                </div>

                <div className="studentId"><span>11학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "changhun.jpg"} alt="회원"/>
                        <div>최창헌 (3대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seon.jpg"} alt="회원"/>
                        <div>최 선</div>
                    </div>
                </div>


                <div className="studentId"><span>13학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "hyeonmin.jpg"} alt="회원"/>
                        <div>고현민</div>
                    </div>
                </div>

                <div className="studentId"><span>14학번</span></div>
                <hr/>
                <div className="grid-container">
                    <div className="member">
                        <img src={imgUrl + "jeonghyun.jpg"} alt="회원"/>
                        <div>장정현 (4대 회장)</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "ilseob.jpg"} alt="회원"/>
                        <div>이일섭</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "seonhye.jpg"} alt="회원"/>
                        <div>김선혜</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jinho.jpg"} alt="회원"/>
                        <div>이진호</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "daeun_14.jpg"} alt="회원"/>
                        <div>곽다은</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sihyeon.jpg"} alt="회원"/>
                        <div>박시현</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "sumin.jpg"} alt="회원"/>
                        <div>김수민</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "jaewoo2.jpg"} alt="회원"/>
                        <div>최재우</div>
                    </div>
                    <div className="member">
                        <img src={imgUrl + "chiho.jpg"} alt="회원"/>
                        <div>이치호</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubMember2;