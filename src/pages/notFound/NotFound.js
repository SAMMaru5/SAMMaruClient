import "./NotFound.scss";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

function NotFound() {
  const navigate = useNavigate();
  const customHistory = createBrowserHistory();
  return (
    <div className="notFoundPage">
      <img
        src="https://image.msscdn.net/images/network_browser_icon.png"
        alt=""
      />
      <h1 className="mainText">
        페이지를 찾을 수<br />
        없습니다
      </h1>
      <p className="subText">
        페이지의 주소가 잘못 입력되었거나,
        <br /> 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 페이지 주소를 다시 한번 확인해 주세요.
      </p>
      <button className="goHome" onClick={() => navigate("/")}>
        샘마루 홈
      </button>
      <button className="goBack" onClick={() => customHistory.back()}>
        이전 페이지
      </button>
    </div>
  );
}

export default NotFound;
