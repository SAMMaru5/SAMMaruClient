import "./App.scss";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main/MainPage";
import Footer from "./components/Footer";
import ManagementPage from "./pages/management/ManagementPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import AgreePage from "./pages/register/AgreePage";
import FindUserPage from "./pages/findUser/FindUserPage";
import ModifyUserInfoPage from "./pages/modifyUserInfo/ModifyUserInfoPage";
import CheckPwPage from "./pages/modifyUserInfo/CheckPwPage";
import AuthGuard from "./components/AuthGuard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoPage from "./pages/photo/PhotoPage";

import AwardsPage from "./pages/about/AwardsPage";

import ExamPage from "./pages/exam/ExamPage";
import ExamUpdate from "./pages/exam/ExamUpdate";
import ExamDetail from "./pages/exam/ExamDetailPage";

import ProjectPage from "./pages/subProject/ProjectPage";
import ProjectUpdate from "./pages/subProject/ProjectUpdate";
import ProjectDetail from "./pages/subProject/ProjectDetailPage";

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

import SeminarPage from "./pages/seminar/SeminarPage";
import SeminarUpdate from "./pages/seminar/SeminarUpdate";
import SeminarDetail from "./pages/seminar/SeminarDetailPage";

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
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route
            path="/exam/examUpdate"
            element={
              <AuthGuard>
                <ExamUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/examDetail"
            element={
              <AuthGuard>
                <ExamDetail />
              </AuthGuard>
            }
          />

          <Route path="/project" element={<ProjectPage />} />
          <Route
            path="/project/projectUpdate"
            element={
              <AuthGuard>
                <ProjectUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/projectDetail"
            element={
              <AuthGuard>
                <ProjectDetail />
              </AuthGuard>
            }
          />

          <Route path="/seminar" element={<SeminarPage />} />
          <Route
            path="/seminar/seminarUpdate"
            element={
              <AuthGuard>
                <SeminarUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/seminarDetail"
            element={
              <AuthGuard>
                <SeminarDetail />
              </AuthGuard>
            }
          />

          <Route path="/photo" element={<PhotoPage />} />
          <Route
            path="/photo/photoUpdate"
            element={
              <AuthGuard>
                <PhotoUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/photo/photoDetail"
            element={
              <AuthGuard>
                <PhotoDetail />
              </AuthGuard>
            }
          />

          <Route path="/notice" element={<NoticePage />} />
          <Route
            path="/noticeDetail"
            element={
              <AuthGuard>
                <NoticeDetailPage />
              </AuthGuard>
            }
          />
          <Route
            path="/notice/noticeUpdate"
            element={
              <AuthGuard>
                <NoticeUpdate />
              </AuthGuard>
            }
          />

          <Route path="/report" element={<ReportPage />} />
          <Route
            path="/report/reportUpdate"
            element={
              <AuthGuard>
                <ReportUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/reportDetail"
            element={
              <AuthGuard>
                <ReportDetail />
              </AuthGuard>
            }
          />

          <Route path="/freeBoard" element={<FreeBoardPage />} />
          <Route
            path="/freeBoard/freeBoardUpdate"
            element={
              <AuthGuard>
                <FreeBoardUpdate />
              </AuthGuard>
            }
          />
          <Route
            path="/freeBoardDetail"
            element={
              <AuthGuard>
                <FreeBoardDetail />
              </AuthGuard>
            }
          />

          <Route
            path="/management"
            element={
              <AuthGuard>
                <ManagementPage />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/agree" element={<AgreePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/findUser" element={<FindUserPage />} />
          <Route
            path="/checkPw"
            element={
              <AuthGuard>
                <CheckPwPage />
              </AuthGuard>
            }
          />
          <Route
            path="/modifyUserInfo"
            element={
              <AuthGuard>
                <ModifyUserInfoPage />
              </AuthGuard>
            }
          />

          <Route path="/clubIntro" element={<IntroClubPage />} />
          <Route
            path="/member/1"
            element={
              <AuthGuard>
                <ClubMember1 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/2"
            element={
              <AuthGuard>
                <ClubMember2 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/3"
            element={
              <AuthGuard>
                <ClubMember3 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/4"
            element={
              <AuthGuard>
                <ClubMember4 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/5"
            element={
              <AuthGuard>
                <ClubMember5 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/6"
            element={
              <AuthGuard>
                <ClubMember6 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/7"
            element={
              <AuthGuard>
                <ClubMember7 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/8"
            element={
              <AuthGuard>
                <ClubMember8 />
              </AuthGuard>
            }
          />
          <Route
            path="/member/9"
            element={
              <AuthGuard>
                <ClubMember9 />
              </AuthGuard>
            }
          />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
