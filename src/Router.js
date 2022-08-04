import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";
import ManagepentPage from "./pages/management/ManagementPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import AgreePage from "./pages/register/AgreePage";
import FindUserPage from "./pages/findUser/FindUserPage";
import ModifyUserInfoPage from "./pages/modifyUserInfo/ModifyUserInfoPage";
import CheckPwPage from "./pages/modifyUserInfo/CheckPwPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoPage from "./pages/photo/PhotoPage";

import AwardsPage from "./pages/about/AwardsPage";

import ExamPage from "./pages/exam/ExamPage";
import ExamUpdate from "./pages/exam/ExamUpdate";
import ExamDetail from "./pages/exam/ExamDetailPage";

import NoticePage from "./pages/notice/NoticePage";
import NoticeDetailPage from "./pages/notice/NoticeDetailPage";
import NoticeUpdate from "./pages/notice/NoticeUpdate";

import PhotoDetail from "./pages/photo/PhotoDetail";
import PhotoUpdate from "./pages/photo/PhotoUpdate";

import FreeBoardPage from "./pages/freeBoard/FreeBoardPage";
import FreeBoardUpdate from "./pages/freeBoard/FreeBoardUpdate";
import FreeBoardDetail from "./pages/freeBoard/FreeBoardDetailPage";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import IntroClubPage from "./pages/about/IntroClubPage";

import ClubMember1 from "./pages/about/member/ClubMember1";
import ClubMember2 from "./pages/about/member/ClubMember2";
import ClubMember3 from "./pages/about/member/ClubMember3";
import ClubMember4 from "./pages/about/member/ClubMember4";
import ClubMember5 from "./pages/about/member/ClubMember5";
import ClubMember6 from "./pages/about/member/ClubMember6";
import ClubMember7 from "./pages/about/member/ClubMember7";
import ClubMember8 from "./pages/about/member/ClubMember8";
import ClubMember9 from "./pages/about/member/ClubMember9";


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/exam/examUpdate" element={<ExamUpdate />} />
          <Route path="/examDetail" element={<ExamDetail />} />
          <Route path="/photo" element={<PhotoPage />} />
          <Route path="/photo/photoUpdate" element={<PhotoUpdate />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/noticeDetail" element={<NoticeDetailPage />} />
          <Route path="/notice/noticeUpdate" element={<NoticeUpdate />} />

          <Route path="/freeBoard" element={<FreeBoardPage />} />
          <Route
            path="/freeBoard/freeBoardUpdate"
            element={<FreeBoardUpdate />}
          />
          <Route path="/freeBoardDetail" element={<FreeBoardDetail />} />

          <Route path="/management" element={<ManagepentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/agree" element={<AgreePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/findUser" element={<FindUserPage />} />
          <Route path="/photo/photoDetail" element={<PhotoDetail />} />
          <Route path="/checkPw" element={<CheckPwPage />} />
          <Route path="/modifyUserInfo" element={<ModifyUserInfoPage />} />

          <Route path="/clubIntro" element={<IntroClubPage/>} />

          <Route path="/clubMember1" element={<ClubMember1 />} />
          <Route path="/clubMember2" element={<ClubMember2 />} />
          <Route path="/clubMember3" element={<ClubMember3 />} />
          <Route path="/clubMember4" element={<ClubMember4 />} />
          <Route path="/clubMember5" element={<ClubMember5 />} />
          <Route path="/clubMember6" element={<ClubMember6 />} />
          <Route path="/clubMember7" element={<ClubMember7 />} />
          <Route path="/clubMember8" element={<ClubMember8 />} />
          <Route path="/clubMember9" element={<ClubMember9 />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
