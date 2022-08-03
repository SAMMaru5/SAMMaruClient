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

import ReportPage from "./pages/report/ReportPage";
import ReportUpdate from "./pages/report/ReportUpdate";
import ReportDetail from "./pages/report/ReportDetailPage";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import IntroClubPage from "./pages/about/IntroClubPage";
import ClubMember from "./pages/about/member/ClubMember";

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
          <Route path="/report" element={<ReportPage />} />
          <Route path="/report/reportUpdate" element={<ReportUpdate />} />
          <Route path="/reportDetail" element={<ReportDetail />} />

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

          <Route path="/clubIntro" element={<IntroClubPage />} />

          <Route path="/clubMember" element={<ClubMember />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
